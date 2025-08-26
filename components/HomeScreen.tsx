'use client'

import Image from 'next/image'
import { Search as SearchIcon, SlidersHorizontal } from 'lucide-react'
import type { EventItem } from './types'

export default function HomeScreen({ events, onSelect }: { events: EventItem[]; onSelect: (ev: EventItem) => void }) {
  const featured = events[0]
  const trending = events.slice(1,5)
  const upcoming = events.slice(0,3)

  return (
 <div className="mx-auto max-w-md">
  {/* Header */}
  <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-neutral-100">
    <div className="mx-auto max-w-md px-4 py-3 flex items-center justify-between">
      <h1 className="text-xl font-extrabold tracking-tight">Local Korea</h1>
      <a
        href="/login"
        className="px-3 py-1.5 rounded-xl bg-neutral-900 text-white text-xs active:scale-95"
      >
        Profile
      </a>
    </div>
    {/* Search row */}

        <div className="mx-auto max-w-md px-4 pb-3">
          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center gap-2 bg-neutral-100 rounded-2xl px-3 py-2">
              <SearchIcon className="h-5 w-5 shrink-0" />
              <input placeholder="Search events, places, hosts..." className="w-full bg-transparent outline-none text-sm" />
            </div>
            <button className="p-2 rounded-2xl bg-neutral-900 text-white active:scale-95">
              <SlidersHorizontal className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-md px-4 pb-28 space-y-8">
        {/* Featured hero */}
        <section aria-label="Featured Event">
          <button className="relative h-56 rounded-3xl overflow-hidden shadow-md w-full active:scale-95"
                  onClick={()=>onSelect(featured)}>
            <Image src={featured.cover || featured.image} alt={featured.title} fill priority sizes="(max-width: 768px) 100vw, 600px" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute bottom-0 p-4 text-white text-left">
              <p className="text-xs font-semibold tracking-wide uppercase opacity-90">Featured Event</p>
              <h2 className="text-2xl font-extrabold leading-tight drop-shadow-sm">{featured.title}</h2>
              <p className="text-sm opacity-90">{featured.city} · {featured.language.join('/')}</p>
            </div>
          </button>
        </section>

        {/* Trending carousel */}
        <section aria-label="Trending This Week" className="space-y-3">
          <div className="flex items-baseline justify-between">
            <h3 className="text-lg font-bold">Trending This Week</h3>
            <button className="text-sm text-neutral-500 hover:text-neutral-900">See all</button>
          </div>
        </section>
        <div className="-mx-4 px-4 overflow-x-auto">
          <div className="flex gap-3 w-max">
            {trending.map((item) => (
              <button key={item.id} onClick={()=>onSelect(item)} className="relative h-40 w-40 rounded-3xl overflow-hidden shadow-sm active:scale-95">
                <Image src={item.image} alt={item.title} width={160} height={160} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute bottom-2 left-2 right-2 text-white text-sm font-semibold leading-snug drop-shadow">
                  {item.title}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Upcoming list */}
        <section aria-label="Upcoming Events" className="space-y-3">
          <h3 className="text-lg font-bold">Upcoming Events</h3>
          <ul className="space-y-3">
            {upcoming.map((ev) => (
              <li key={ev.id} onClick={()=>onSelect(ev)} className="flex items-center gap-3 bg-neutral-50 rounded-2xl p-2 hover:bg-neutral-100 transition active:scale-[0.99] cursor-pointer">
                <Image src={ev.image} alt={ev.title} width={56} height={56} className="h-14 w-14 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{ev.title}</p>
                  <p className="text-xs text-neutral-500">{ev.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-neutral-500">Price</p>
                  <p className="text-sm font-semibold">₩{ev.priceKRW.toLocaleString()}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  )
}
