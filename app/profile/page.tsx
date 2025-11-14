'use client'

import { useEffect, useMemo, useState } from 'react'
import { GITHUB_MARKETPLACE_PLAN, summarizeCoreRuns } from '@/lib/plan'

const DEFAULT_USER_ID = 'demo-user'

type PlanResponse = {
  plan: typeof GITHUB_MARKETPLACE_PLAN
  usage: {
    userId: string
    billingMonth: string
    planId?: string
    isPaid: boolean
    activeSessions: number
    projectSubmissions: number
    coreRuns: Record<string, number>
    updatedAt?: string
  }
  status?: string
  error?: string
}

export default function ProfilePage() {
  const [userId, setUserId] = useState(DEFAULT_USER_ID)
  const [purchaseToken, setPurchaseToken] = useState('')
  const [response, setResponse] = useState<PlanResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const limits = GITHUB_MARKETPLACE_PLAN.limits

  const fetchUsage = async (id: string) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/marketplace?userId=${encodeURIComponent(id)}`)
      const json = await res.json()
      if (!res.ok) {
        throw new Error(json.error || 'Unable to load plan overview')
      }
      setResponse(json)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsage(userId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const activatePlan = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/marketplace', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, purchaseToken })
      })
      const json = await res.json()
      if (!res.ok) {
        throw new Error(json.error || 'Unable to activate plan')
      }
      setResponse(json)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const usage = response?.usage
  const sessionUsage = useMemo(() => {
    if (!usage) return 0
    return (usage.activeSessions / limits.sessions) * 100
  }, [usage, limits.sessions])

  const submissionsUsage = useMemo(() => {
    if (!usage) return 0
    return (usage.projectSubmissions / limits.projectSubmissionsPerMonth) * 100
  }, [usage, limits.projectSubmissionsPerMonth])

  const hasPlan = Boolean(usage?.isPaid && usage?.planId)

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-zinc-900 text-white p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-400">GitHub Marketplace</p>
          <h1 className="text-3xl font-semibold">Paid Plan Overview</h1>
          <p className="text-sm text-zinc-400">
            Confirm your GitHub Marketplace purchase to unlock premium onboarding tooling. Every profile is throttled to keep the
            platform resilient to DDoS spikes, capped project submissions and guarded compute cores.
          </p>
        </header>

        <section className="bg-zinc-900/60 rounded-xl border border-zinc-800 p-6 grid gap-6 md:grid-cols-3">
          <div className="space-y-2">
            <p className="text-zinc-400 text-xs">User ID</p>
            <input
              value={userId}
              onChange={(event) => setUserId(event.target.value)}
              className="w-full rounded-md bg-zinc-950 border border-zinc-800 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
          <div className="space-y-2">
            <p className="text-zinc-400 text-xs">Purchase Token</p>
            <input
              value={purchaseToken}
              onChange={(event) => setPurchaseToken(event.target.value)}
              placeholder="sha256 hmac from GitHub webhook"
              className="w-full rounded-md bg-zinc-950 border border-zinc-800 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
          <div className="flex items-end gap-3">
            <button
              onClick={() => fetchUsage(userId)}
              className="flex-1 rounded-md bg-zinc-800 px-4 py-2 text-sm border border-zinc-700 hover:bg-zinc-700 transition"
              disabled={loading}
            >
              Refresh Overview
            </button>
            <button
              onClick={activatePlan}
              className="flex-1 rounded-md bg-emerald-500/90 px-4 py-2 text-sm font-semibold text-black hover:bg-emerald-400 transition"
              disabled={loading}
            >
              Confirm Payment
            </button>
          </div>
        </section>

        {error && <div className="rounded-md border border-red-900 bg-red-950/50 p-3 text-sm text-red-300">{error}</div>}

        <section className="bg-zinc-900/60 rounded-xl border border-zinc-800 p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Current Plan</p>
              <h2 className="text-2xl font-semibold">{GITHUB_MARKETPLACE_PLAN.name}</h2>
            </div>
            <div className="text-right">
              <p className="text-sm text-zinc-400">${GITHUB_MARKETPLACE_PLAN.price} {GITHUB_MARKETPLACE_PLAN.currency}/mo</p>
              <p className={`text-xs font-semibold ${hasPlan ? 'text-emerald-400' : 'text-amber-400'}`}>
                {hasPlan ? 'Payment confirmed' : 'Awaiting purchase confirmation'}
              </p>
            </div>
          </div>
          <p className="text-sm text-zinc-400">{GITHUB_MARKETPLACE_PLAN.description}</p>
          <ul className="text-sm text-zinc-300 space-y-2">
            <li>• DDoS protection via max {limits.sessions} simultaneous sessions</li>
            <li>• {limits.projectSubmissionsPerMonth} project submissions per user every billing month</li>
            <li>• {limits.coreRunsPerCore} AI runs per compute core to guard credits</li>
          </ul>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          <UsageCard
            title="Active Sessions"
            value={`${usage?.activeSessions ?? 0}/${limits.sessions}`}
            description="Concurrent session ceiling shields the platform from floods."
            percent={sessionUsage}
          />
          <UsageCard
            title="Project Submissions"
            value={`${usage?.projectSubmissions ?? 0}/${limits.projectSubmissionsPerMonth}`}
            description="Each ingest pipeline consumes marketplace credits, so we cap monthly submissions."
            percent={submissionsUsage}
          />
          <UsageCard
            title="Core Runs"
            value={summarizeCoreRuns(usage?.coreRuns ?? {})}
            description={`Every core may run ${limits.coreRunsPerCore} times.`}
            percent={0}
          />
        </section>

        <section className="bg-zinc-900/60 rounded-xl border border-zinc-800 p-6 space-y-4">
          <h3 className="text-lg font-semibold">Operational Notes</h3>
          <ul className="list-disc text-sm text-zinc-400 ml-6 space-y-2">
            <li>
              Confirming payment is as simple as sending the HMAC token GitHub posts to your webhook. We repeat the hash check on
              this page before enabling the plan server-side.
            </li>
            <li>
              Every usage event (session start, ingestion, AI core execution) is persisted via Supabase to coordinate throttling
              between the UI and backend workers.
            </li>
            <li>
              Limits reset on the first day of each month (UTC) and can be surfaced via the `/api/marketplace` and `/api/usage`
              endpoints for automation.
            </li>
          </ul>
        </section>
      </div>
    </div>
  )
}

function UsageCard({
  title,
  value,
  description,
  percent
}: {
  title: string
  value: string
  description: string
  percent: number
}) {
  return (
    <div className="bg-zinc-900/60 rounded-xl border border-zinc-800 p-5 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-400">{title}</p>
        <span className="text-sm font-semibold text-white">{value}</span>
      </div>
      {percent > 0 && (
        <div className="h-2 rounded-full bg-zinc-800 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400" style={{ width: `${Math.min(percent, 100)}%` }} />
        </div>
      )}
      <p className="text-xs text-zinc-500">{description}</p>
    </div>
  )
}
