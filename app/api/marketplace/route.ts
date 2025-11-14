import crypto from 'crypto'
import { NextResponse } from 'next/server'
import { GITHUB_MARKETPLACE_PLAN, getCurrentBillingMonth } from '@/lib/plan'
import { loadUsageSnapshot, persistUsageSnapshot } from '@/lib/usage-store'

type MarketplaceWebhookEvent = {
  action: string
  marketplace_purchase?: {
    account?: {
      id?: number
      login?: string
    }
    plan?: {
      id?: number
      name?: string
    }
  }
}

const PAID_ACTIONS = new Set(['purchased', 'pending_change', 'changed', 'renewed'])

function parseMarketplacePayload(body: string, contentType: string | null): MarketplaceWebhookEvent {
  const normalizedType = (contentType || '').split(';')[0].trim().toLowerCase()

  if (normalizedType === 'application/json') {
    return JSON.parse(body)
  }

  if (normalizedType === 'application/x-www-form-urlencoded') {
    const params = new URLSearchParams(body)
    const payload = params.get('payload')
    if (!payload) {
      throw new Error('Webhook payload is missing the `payload` parameter')
    }
    return JSON.parse(payload)
  }

  throw new Error(`Unsupported webhook content type: ${contentType}`)
}

function verifySignature(body: string, signature: string | null, secret: string) {
  if (!signature || !signature.startsWith('sha256=')) {
    return false
  }

  const hash = crypto.createHmac('sha256', secret).update(body).digest('hex')
  const expected = Buffer.from(`sha256=${hash}`)
  const received = Buffer.from(signature)

  if (expected.length !== received.length) {
    return false
  }

  return crypto.timingSafeEqual(expected, received)
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId') || 'demo-user'
    const billingMonth = getCurrentBillingMonth()

    const snapshot = await loadUsageSnapshot(userId, billingMonth)

    return NextResponse.json({
      plan: GITHUB_MARKETPLACE_PLAN,
      usage: snapshot
    })
  } catch (error) {
    console.error('[marketplace:get]', error)
    return NextResponse.json({ error: (error as Error).message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const secret = process.env.MARKETPLACE_SHARED_SECRET
    if (!secret) {
      return NextResponse.json({ error: 'MARKETPLACE_SHARED_SECRET is not configured' }, { status: 500 })
    }

    const rawBody = await request.text()
    const signature = request.headers.get('x-hub-signature-256')

    if (!verifySignature(rawBody, signature, secret)) {
      return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 401 })
    }

    const event = parseMarketplacePayload(rawBody, request.headers.get('content-type'))

    const account = event.marketplace_purchase?.account
    const plan = event.marketplace_purchase?.plan

    if (!account?.id && !account?.login) {
      return NextResponse.json({ error: 'Marketplace account identifier is required' }, { status: 400 })
    }

    const userId = `github-marketplace-${account.id ?? account.login}`
    const billingMonth = getCurrentBillingMonth()
    const snapshot = await loadUsageSnapshot(userId, billingMonth)

    snapshot.planId = plan?.name || plan?.id?.toString() || GITHUB_MARKETPLACE_PLAN.id
    snapshot.isPaid = PAID_ACTIONS.has(event.action)

    await persistUsageSnapshot(snapshot)

    return NextResponse.json({
      ok: true,
      action: event.action,
      plan: GITHUB_MARKETPLACE_PLAN,
      usage: snapshot,
    })
  } catch (error) {
    console.error('[marketplace:post]', error)
    return NextResponse.json({ error: (error as Error).message }, { status: 500 })
  }
}
