import { NextResponse } from 'next/server'
import { GITHUB_MARKETPLACE_PLAN, UsageSnapshot, getCurrentBillingMonth } from '@/lib/plan'
import { loadUsageSnapshot, persistUsageSnapshot } from '@/lib/usage-store'

type UsageAction = 'start-session' | 'end-session' | 'project-submission' | 'core-run'

type UsagePayload = {
  userId: string
  action: UsageAction
  coreId?: string
}

async function loadOrCreateSnapshot(userId: string, billingMonth: string) {
  return loadUsageSnapshot(userId, billingMonth)
}

async function saveSnapshot(snapshot: UsageSnapshot) {
  await persistUsageSnapshot(snapshot)
}

function enforceLimits(snapshot: UsageSnapshot, action: UsageAction, coreId?: string) {
  const limits = GITHUB_MARKETPLACE_PLAN.limits

  switch (action) {
    case 'start-session': {
      if (snapshot.activeSessions >= limits.sessions) {
        throw new Error('Session limit reached. Please close an active session before starting a new one.')
      }
      snapshot.activeSessions += 1
      break
    }
    case 'end-session': {
      snapshot.activeSessions = Math.max(0, snapshot.activeSessions - 1)
      break
    }
    case 'project-submission': {
      if (snapshot.projectSubmissions >= limits.projectSubmissionsPerMonth) {
        throw new Error('Monthly project submission limit reached (30).')
      }
      snapshot.projectSubmissions += 1
      break
    }
    case 'core-run': {
      if (!coreId) {
        throw new Error('coreId is required for core-run usage tracking')
      }
      const current = snapshot.coreRuns[coreId] ?? 0
      if (current >= limits.coreRunsPerCore) {
        throw new Error(`Core ${coreId} already executed ${limits.coreRunsPerCore} runs this cycle.`)
      }
      snapshot.coreRuns = { ...snapshot.coreRuns, [coreId]: current + 1 }
      break
    }
    default:
      throw new Error('Unsupported usage action')
  }
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as UsagePayload
    const { userId, action, coreId } = payload

    if (!userId || !action) {
      return NextResponse.json({ error: 'userId and action are required' }, { status: 400 })
    }

    const billingMonth = getCurrentBillingMonth()
    const snapshot = await loadOrCreateSnapshot(userId, billingMonth)

    enforceLimits(snapshot, action, coreId)
    await saveSnapshot(snapshot)

    return NextResponse.json({ usage: snapshot })
  } catch (error) {
    console.error('[usage:post]', error)
    return NextResponse.json({ error: (error as Error).message }, { status: 429 })
  }
}
