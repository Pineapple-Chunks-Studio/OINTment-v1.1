export type UsageSnapshot = {
  userId: string
  billingMonth: string
  planId?: string
  isPaid: boolean
  activeSessions: number
  projectSubmissions: number
  coreRuns: Record<string, number>
  updatedAt?: string
}

export const GITHUB_MARKETPLACE_PLAN = {
  id: 'github-marketplace-pro',
  name: 'Mission Control Pro',
  description: 'Paid plan purchased via the GitHub Marketplace to unlock ingestion, AI and visualization features.',
  price: 49,
  currency: 'USD',
  limits: {
    sessions: 4,
    projectSubmissionsPerMonth: 30,
    coreRunsPerCore: 3
  },
  marketingHighlights: [
    'Verified payment before enabling ingest, roast and AI flows',
    'Session throttling to keep workloads resilient to DDoS attempts',
    'Usage tracking for submissions and compute cores'
  ]
} as const

export function getCurrentBillingMonth(date = new Date()) {
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}`
}

export function createEmptyUsageSnapshot(userId: string, billingMonth: string): UsageSnapshot {
  return {
    userId,
    billingMonth,
    isPaid: false,
    planId: undefined,
    activeSessions: 0,
    projectSubmissions: 0,
    coreRuns: {}
  }
}

export function summarizeCoreRuns(coreRuns: Record<string, number>) {
  const entries = Object.entries(coreRuns)
  if (!entries.length) {
    return 'No cores have been used yet.'
  }
  return entries
    .map(([core, runs]) => `${core}: ${runs} run${runs === 1 ? '' : 's'}`)
    .join(', ')
}
