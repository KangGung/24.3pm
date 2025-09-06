'use client'

import { supabase } from '../lib/supabaseClient'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'
import type { EventItem } from './types'

export default function EventDetail({ event, onBack }: { event: EventItem | null, onBack: () => void }) {
  const data = event ?? {
    id: 0,
    slug: 'fallback-event',
    title: 'Traditional Tea Ceremony',
    city: 'Seoul',
    language: ['EN','KR'],
    date: 'Sep 06',
    priceKRW: 15000,
    image: 'https://images.unsplash.com/photo-1523908957990-36f52d52c3b8?q=80&w=1200&auto=format&fit=crop',
    cover: 'https://images.unsplash.com/photo-1523908957990-36f52d52c3b8?q=80&w=1200&auto=format&fit=crop',
    description: 'Join a traditional Korean tea ceremony in a serene hanok. Learn history and rituals with a local host.',
    host: { name: 'Minji', avatar: 'https://i.pravatar.cc/100?img=5' }
  }

  const gallery = [
    data.cover || data.image,
    'https://images.unsplash.com/photo-1608354584374-2f7d8a6aa8f5?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1595147389795-37094173bfd2?q=80&w=1200&auto=format&fit=crop',
  ]

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* Cover */}
      <div className="relative h-64 w-full">
        <Image src={data.cover || data.image} alt={data.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <button onClick={onBack} className="absolute top-3 left-3 p-2 rounded-xl bg-white/90">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="absolute bottom-0 p-4 text-white">
          <h1 className="text-2xl font-extrabold">{data.title}</h1>
          <p className="text-sm opacity-90">{data.city} · {data.language.join('/')}</p>
        </div>
      </div>

      <main className="mx-auto max-w-md px-4 py-5 space-y-6">
        <section className="flex items-center gap-3">
          <Image src={data.host.avatar} alt={data.host.name} width={40} height={40} className="rounded-full" />
          <div>
            <p className="text-sm font-semibold">Hosted by {data.host.name}</p>
            <p className="text-xs text-neutral-500">Verified host</p>
          </div>
        </section>

        <section className="-mx-4 px-4 overflow-x-auto">
          <div className="flex gap-3 w-max">
            {gallery.map((src, i) => (
              <Image key={i} src={src} alt={`gallery-${i}`} width={220} height={140} className="h-36 w-56 rounded-2xl object-cover" />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-2">About this experience</h2>
          <p className="text-sm leading-relaxed text-neutral-700">{data.description}</p>
        </section>

        <section className="grid grid-cols-3 gap-2">
          <span className="px-3 py-1 rounded-full bg-neutral-100 text-xs text-center">{data.date}</span>
          <span className="px-3 py-1 rounded-full bg-neutral-100 text-xs text-center">12 spots left</span>
          <span className="px-3 py-1 rounded-full bg-neutral-100 text-xs text-center">₩{data.priceKRW.toLocaleString()}</span>
        </section>

        <section>
          <h3 className="text-base font-semibold mb-2">Meeting point</h3>
          <div className="h-40 rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-500 text-sm">
            Map placeholder (Kakao/Google later)
          </div>
        </section>

        <section className="sticky bottom-0 inset-x-0 bg-white/90 backdrop-blur pt-3 pb-6">
  <div className="flex items-center justify-between">
    <div>
      <p className="text-xs text-neutral-500">From</p>
      <p className="text-lg font-extrabold">₩{data.priceKRW.toLocaleString()}</p>
    </div>
    <button
      onClick={async () => {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          window.location.href = '/login'
          return
        }
        alert('Logged in ✔️ — booking flow coming next.')
      }}
      className="px-5 py-3 rounded-2xl bg-neutral-900 text-white font-semibold active:scale-95"
    >
      Book now
    </button>
  </div>
</section>

      </main>
    </div>
  )
}
