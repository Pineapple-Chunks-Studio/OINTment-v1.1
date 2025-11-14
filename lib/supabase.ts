import { createClient, SupabaseClient } from '@supabase/supabase-js'

let cachedClient: SupabaseClient | null = null

export function getSupabaseClient() {
  if (cachedClient) return cachedClient

  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY

  if (!url || !key) {
    return null
  }

  cachedClient = createClient(url, key, {
    auth: { persistSession: false },
    global: { headers: { 'x-ointment-client': 'mission-control' } }
  })

  return cachedClient
}
