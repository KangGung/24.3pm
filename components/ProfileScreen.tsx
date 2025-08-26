'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

type SUser = {
  id: string
  email: string | null
  user_metadata?: { name?: string; full_name?: string; picture?: string }
}

export default function ProfileScreen() {
  const [user, setUser] = useState<SUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!mounted) return
      setUser(user as any ?? null)
      setLoading(false)
    })()
    return () => { mounted = false }
  }, [])

  const signOut = async () => {
    await supabase.auth.signOut()
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user as any ?? null)
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-md px-4 pb-24">
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-neutral-100">
          <div className="mx-auto max-w-md px-4 py-4">
            <h1 className="text-xl font-extrabold tracking-tight">Profile</h1>
          </div>
        </header>
        <div className="mt-6 text-sm text-neutral-500">Loading…</div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-md px-4 pb-24 space-y-6">
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-neutral-100">
          <div className="mx-auto max-w-md px-4 py-4">
            <h1 className="text-xl font-extrabold tracking-tight">Profile</h1>
          </div>
        </header>

        <section className="mt-4 rounded-2xl bg-neutral-50 p-4 flex items-center gap-3">
          <Image src={'https://i.pravatar.cc/100?img=7'} alt={'Guest'} width={48} height={48} className="rounded-full" />
          <div className="min-w-0">
            <p className="text-sm font-semibold truncate">Guest</p>
            <p className="text-xs text-neutral-500 truncate">Not signed in</p>
          </div>
          <div className="ml-auto">
            <a href="/login" className="px-3 py-1.5 rounded-xl bg-neutral-900 text-white text-xs">Sign in</a>
          </div>
        </section>
      </div>
    )
  }

  const displayName =
    user.user_metadata?.name ||
    user.user_metadata?.full_name ||
    user.email?.split('@')[0] ||
    'User'

  const avatar =
    user.user_metadata?.picture ||
    `https://i.pravatar.cc/100?u=${user.id}`

  return (
    <div className="mx-auto max-w-md px-4 pb-24 space-y-6">
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-neutral-100">
        <div className="mx-auto max-w-md px-4 py-4">
          <h1 className="text-xl font-extrabold tracking-tight">Profile</h1>
        </div>
      </header>

      <section className="mt-4 rounded-2xl bg-neutral-50 p-4 flex items-center gap-3">
        <Image src={avatar} alt={displayName} width={48} height={48} className="rounded-full" />
        <div className="min-w-0">
          <p className="text-sm font-semibold truncate">{displayName}</p>
          <p className="text-xs text-neutral-500 truncate">{user.email ?? '—'}</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <a href="/login" className="px-3 py-1.5 rounded-xl border text-xs">Manage</a>
          <button onClick={signOut} className="px-3 py-1.5 rounded-xl bg-neutral-900 text-white text-xs">Sign out</button>
        </div>
      </section>

      {/* My Bookings (placeholder for B step) */}
      <section className="rounded-2xl border border-neutral-200 p-4">
        <h2 className="text-sm font-semibold mb-2">My Bookings</h2>
        <p className="text-sm text-neutral-500">No bookings yet.</p>
      </section>

      {/* Favorites (optional) */}
      <section className="rounded-2xl border border-neutral-200 p-4">
        <h2 className="text-sm font-semibold mb-2">Favorites</h2>
        <p className="text-sm text-neutral-500">Save events you like from the Home screen (coming soon).</p>
      </section>
    </div>
  )
}
