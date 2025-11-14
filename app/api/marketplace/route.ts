import crypto from 'crypto'
import { NextResponse } from 'next/server'
import { GITHUB_MARKETPLACE_PLAN, getCurrentBillingMonth } from '@/lib/plan'
import { loadUsageSnapshot, persistUsageSnapshot } from '@/lib/usage-store'

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
    const body = await request.json()
    const { userId, purchaseToken } = body

    if (!userId || !purchaseToken) {
      return NextResponse.json({ error: 'userId and purchaseToken are required' }, { status: 400 })
    }

    const secret = process.env.MARKETPLACE_SHARED_SECRET
    if (!secret) {
      return NextResponse.json({ error: 'MARKETPLACE_SHARED_SECRET is not configured' }, { status: 500 })
    }

    const expectedToken = crypto.createHmac('sha256', secret).update(userId).digest('hex')
    if (expectedToken !== purchaseToken) {
      return NextResponse.json({ error: 'Unable to verify GitHub Marketplace payment' }, { status: 401 })
    }

    const billingMonth = getCurrentBillingMonth()
    const snapshot = await loadUsageSnapshot(userId, billingMonth)
    snapshot.planId = GITHUB_MARKETPLACE_PLAN.id
    snapshot.isPaid = true

    await persistUsageSnapshot(snapshot)

    return NextResponse.json({
      plan: GITHUB_MARKETPLACE_PLAN,
      usage: snapshot,
      status: 'activated'
    })
  } catch (error) {
    console.error('[marketplace:post]', error)
    return NextResponse.json({ error: (error as Error).message }, { status: 500 })
  }
}
