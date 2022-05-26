import { createClient } from '@supabase/supabase-js'

declare global {
    let __api: { env: { SVELTE_APP_SUPABASE_URL: string; SVELTE_APP_SUPABASE_ANON_KEY: string; }; };
}

const supabaseUrl = __api.env.SVELTE_APP_SUPABASE_URL
const supabaseAnonKey = __api.env.SVELTE_APP_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

console.log("url", supabaseUrl);