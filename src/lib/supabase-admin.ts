import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

if (!supabaseUrl || !supabaseServiceKey) {
  if (process.env.NODE_ENV === "production") {
    console.warn("⚠️ Warning: Supabase environment variables are missing. Some features may not work.");
  }
}

/**
 * Supabase client that bypasses RLS using the service role key.
 * This should ONLY be used in Server Components, Server Actions, or Route Handlers.
 * NEVER expose the service role key to the client!
 */
export const supabaseAdmin = createClient(
  supabaseUrl,
  supabaseServiceKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);
