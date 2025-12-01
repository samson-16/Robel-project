import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase URL or Anon Key")
}

// Server-side client with service role (admin access)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey || supabaseAnonKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

// Client-side client (public access)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Applicant = {
  id: string
  name: string
  age: number
  phone: string
  passport_number: string
  status: "pending" | "rejected" | "accepted"
  profile_picture: string | null
  date_added: string
  created_at: string
  updated_at: string
}
