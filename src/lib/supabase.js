// /src/lib/supabase.js
// Supabase client configuration

import { createClient } from '@supabase/supabase-js'

// These should be in your .env file with VITE_ prefix
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const isValidUrl = (value) => {
  try {
    if (!value) return false
    // eslint-disable-next-line no-new
    new URL(value)
    return true
  } catch {
    return false
  }
}

const createStubClient = () => {
  const error = new Error('Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.')
  const rejected = () => Promise.reject(error)
  const chain = {
    select: rejected,
    eq: rejected,
    insert: rejected,
    update: rejected,
    delete: rejected,
    order: rejected,
    limit: rejected,
    single: rejected,
  }
  return {
    from: () => chain,
    rpc: rejected,
    auth: {
      signInWithPassword: rejected,
      signOut: rejected,
      getUser: rejected,
    },
  }
}

export const supabase = (isValidUrl(supabaseUrl) && !!supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      }
    })
  : createStubClient()