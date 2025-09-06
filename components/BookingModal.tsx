'use client'

import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

type Props = {
  open: boolean
  onClose: () => void
  event: {
    slug: string
    title: string
    priceKRW: number
  }
}

export default function BookingModal({ open, onClose, event }: Props) {
  const [qty, setQty] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  if (!open) return null

  const submit = async () => {
    setLoading(true)
    setError(null)
    try {
      const { data: { user }, error: userErr } = await supabase.auth.getUser()
      if (userErr) throw userErr
      if (!user) {
        window.location.href = '/login'
        return
      }
      const { error: insertErr } = await supabase
        .from('bookings')
        .insert({
          user_id: user.id,
          event_slug: event.slug,
          event_title: event.title,
          qty,
          price_krw: event.priceKRW
        })
      if (insertErr) throw insertErr
      setSuccess(true)
    } catch (e: any) {
      setError(e?.message || 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-4 shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold">{success ? 'Booked!' : 'Confirm your booking'}</h3>
          <button onClick={onClose} className="px-2 py-1 rounded-md text-sm hover:bg-neutral-100">Close</button>
        </div>

        {!success ? (
          <div className="mt-4 space-y-4">
            <div className="rounded-xl bg-neutral-50 p-3">
              <p className="text-sm font-semibold">{event.title}</p>
              <p className="text-xs text-neutral-500">₩{event.priceKRW.toLocaleString()} per ticket</p>
            </div>

            <div>
              <label className="text-sm font-semibold">Quantity</label>
              <div className="mt-2 flex items-center gap-2">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-1.5 rounded-xl border">-</button>
                <input
                  type="number"
                  min={1}
                  value={qty}
                  onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
                  className="w-20 rounded-xl border px-3 py-2 text-sm"
                />
                <button onClick={() => setQty(qty + 1)} className="px-3 py-1.5 rounded-xl border">+</button>
              </div>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              onClick={submit}
              disabled={loading}
              className="w-full px-5 py-3 rounded-2xl bg-neutral-900 text-white font-semibold active:scale-95 disabled:opacity-60"
            >
              {loading ? 'Booking…' : 'Confirm & Book'}
            </button>
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            <p className="text-sm">Your booking has been created 🎉</p>
            <a href="/profile" className="w-full inline-block text-center px-5 py-3 rounded-2xl bg-neutral-900 text-white font-semibold active:scale-95">
              View my bookings
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
