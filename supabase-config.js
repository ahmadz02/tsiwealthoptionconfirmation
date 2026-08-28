const SUPABASE_URL = 'https://ydpwrlwzmbloytjuuarx.supabase.co';

const SUPABASE_PUBLISHABLE_KEY =
  'sb_publishable_hJbKJq2avfol8PLLrVxJIg_A1ToPsdp';

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  }
);