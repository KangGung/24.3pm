'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabaseClient'
import ProfileScreen from '../../components/ProfileScreen'

export default function ProfilePage() {
  const router = useRouter()

  useEffect(() => {
    let mounted = true
    ;(async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!mounted) return
      if (!user) router.replace('/login')
    })()
    return () => { mounted = false }
  }, [router])

  // We render ProfileScreen either way; if not logged in,
  // the effect above will immediately redirect to /login.
  return <ProfileScreen />
}
