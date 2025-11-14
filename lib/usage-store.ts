import { getSupabaseClient } from '@/lib/supabase'
import { UsageSnapshot, createEmptyUsageSnapshot } from '@/lib/plan'

const TABLE = 'usage_limits'
const memoryStore = new Map<string, UsageSnapshot>()

const getKey = (userId: string, billingMonth: string) => `${userId}:${billingMonth}`

export async function loadUsageSnapshot(userId: string, billingMonth: string) {
  const supabase = getSupabaseClient()
  if (!supabase) {
    if (!memoryStore.has(getKey(userId, billingMonth))) {
      memoryStore.set(getKey(userId, billingMonth), createEmptyUsageSnapshot(userId, billingMonth))
    }
    return memoryStore.get(getKey(userId, billingMonth))!
  }

  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('user_id', userId)
    .eq('billing_month', billingMonth)
    .maybeSingle()

  if (error) throw error
  if (!data) {
    const snapshot = createEmptyUsageSnapshot(userId, billingMonth)
    await persistUsageSnapshot(snapshot)
    return snapshot
  }

  return {
    userId: data.user_id,
    billingMonth: data.billing_month,
    planId: data.plan_id ?? undefined,
    isPaid: Boolean(data.is_paid),
    activeSessions: data.active_sessions ?? 0,
    projectSubmissions: data.project_submissions ?? 0,
    coreRuns: data.core_runs ?? {},
    updatedAt: data.updated_at ?? undefined
  } as UsageSnapshot
}

export async function persistUsageSnapshot(snapshot: UsageSnapshot) {
  const supabase = getSupabaseClient()
  if (!supabase) {
    memoryStore.set(getKey(snapshot.userId, snapshot.billingMonth), { ...snapshot })
    return snapshot
  }

  const { error } = await supabase.from(TABLE).upsert(
    {
      user_id: snapshot.userId,
      billing_month: snapshot.billingMonth,
      plan_id: snapshot.planId,
      is_paid: snapshot.isPaid,
      active_sessions: snapshot.activeSessions,
      project_submissions: snapshot.projectSubmissions,
      core_runs: snapshot.coreRuns,
      updated_at: new Date().toISOString()
    },
    { onConflict: 'user_id,billing_month' }
  )

  if (error) throw error
  return snapshot
}
