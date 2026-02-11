/**
 * Centralized environment variable configuration
 * All environment variables should be loaded and validated here
 */

// API Configuration
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

// Supabase Configuration
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
export const SUPABASE_PUBLISHABLE_KEY =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// Paystack Configuration
export const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

// Validation
if (!SUPABASE_URL) {
  throw new Error(
    "Missing env.VITE_SUPABASE_URL. Please add it to your .env file. " +
      "Get it from your Supabase project settings: https://app.supabase.com/project/_/settings/api"
  );
}

if (!SUPABASE_PUBLISHABLE_KEY) {
  throw new Error(
    "Missing env.VITE_SUPABASE_PUBLISHABLE_KEY. Please add it to your .env file. " +
      "Get it from your Supabase project settings (use the 'anon' or 'public' key, NOT the service_role key): https://app.supabase.com/project/_/settings/api"
  );
}

if (!PAYSTACK_PUBLIC_KEY) {
  throw new Error(
    "Missing env.VITE_PAYSTACK_PUBLIC_KEY. Please add it to your .env file. " +
      "Get it from your Paystack dashboard: https://dashboard.paystack.com/#/settings/developers"
  );
}

// Export a config object for convenience
export const env = {
  api: {
    baseUrl: API_BASE_URL,
  },
  supabase: {
    url: SUPABASE_URL,
    publishableKey: SUPABASE_PUBLISHABLE_KEY,
  },
  paystack: {
    publicKey: PAYSTACK_PUBLIC_KEY,
  },
} as const;
