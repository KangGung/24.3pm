'use client'

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '@/lib/supabaseClient'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-neutral-900 px-4">
      <div className="w-full max-w-md rounded-2xl border border-neutral-200 p-6 shadow-sm">
        <h1 className="text-xl font-extrabold tracking-tight mb-4">Sign in to Local Korea</h1>
        <Auth
          supabaseClient={supabase}
          view="sign_in"
          providers={['google']}
          appearance={{
            theme: ThemeSupa,
            variables: { default: { colors: { brand: '#111111', brandAccent: '#111111' } } }
          }}
          localization={{
            variables: {
              sign_in: { email_label: 'Email', password_label: 'Password' },
              sign_up: { email_label: 'Email', password_label: 'Password' }
            }
          }}
          redirectTo={typeof window !== 'undefined' ? window.location.origin : undefined}
        />
      </div>
    </div>
  )
}
