'use client'

import { useState } from 'react'
import HomeScreen from '../components/HomeScreen'
import EventDetail from '../components/EventDetail'
import ProfileScreen from '../components/ProfileScreen'
import HostDashboard from '../components/HostDashboard'
import HostNewEvent from '../components/HostNewEvent'
import type { EventItem } from '../components/types'

const EVENTS: EventItem[] = [
  {
    id: 1,
    slug: 'gyeongbokgung-palace-tour',
    title: 'Gyeongbokgung Palace Tour',
    city: 'Seoul',
    language: ['EN','KR'],
    date: 'Sep 05',
    priceKRW: 30000,
    image: 'https://images.unsplash.com/photo-1514388619276-6ae38d1f7a4e?q=80&w=1200&auto=format&fit=crop',
    cover: 'https://images.unsplash.com/photo-1514388619276-6ae38d1f7a4e?q=80&w=1600&auto=format&fit=crop',
    description: 'Explore the royal palace with a local guide and discover hidden photo spots.',
    host: { name: 'Minji', avatar: 'https://i.pravatar.cc/100?img=5' }
  },
  {
    id: 2,
    slug: 'seoul-skyline-night-cruise',
    title: 'Seoul Skyline Night Cruise',
    city: 'Seoul',
    language: ['EN'],
    date: 'Sep 08',
    priceKRW: 45000,
    image: 'https://images.unsplash.com/photo-1583397593091-5f83e3874c2f?q=80&w=1200&auto=format&fit=crop',
    description: 'See Seoul’s skyline from the Han River with live commentary.',
    host: { name: 'Jisoo', avatar: 'https://i.pravatar.cc/100?img=6' }
  },
  {
    id: 3,
    slug: 'kimchi-making-class',
    title: 'Kimchi Making Class',
    city: 'Seoul',
    language: ['EN','KR'],
    date: 'Sep 10',
    priceKRW: 20000,
    image: 'https://images.unsplash.com/photo-1604908554055-0c3b7b4bd86d?q=80&w=1200&auto=format&fit=crop',
    description: 'Hands-on kimchi workshop with ingredients provided.',
    host: { name: 'Chef Park', avatar: 'https://i.pravatar.cc/100?img=8' }
  },
  {
    id: 4,
    slug: 'bukhansan-hiking-day',
    title: 'Hiking in Bukhansan',
    city: 'Seoul',
    language: ['EN'],
    date: 'Sep 12',
    priceKRW: 15000,
    image: 'https://images.unsplash.com/photo-1595147389795-37094173bfd2?q=80&w=1200&auto=format&fit=crop',
    description: 'Guided hike with scenic viewpoints and safety tips.',
    host: { name: 'Hyun', avatar: 'https://i.pravatar.cc/100?img=9' }
  },
  {
    id: 5,
    slug: 'han-river-picnic',
    title: 'Han River Picnic',
    city: 'Seoul',
    language: ['EN','KR'],
    date: 'Sep 14',
    priceKRW: 10000,
    image: 'https://images.unsplash.com/photo-1608354584374-2f7d8a6aa8f5?q=80&w=1200&auto=format&fit=crop',
    description: 'Relax by the river with curated snacks and games.',
    host: { name: 'Ara', avatar: 'https://i.pravatar.cc/100?img=10' }
  }
]

export default function PreviewApp() {
  const [tab, setTab] = useState<'home' | 'event' | 'profile' | 'hostdash' | 'hostnew'>('home')
  const [selected, setSelected] = useState<EventItem | null>(null)

  const handleSelect = (ev: EventItem) => {
    setSelected(ev)
    setTab('event')
  }

  return (
    <div className="min-h-screen">
      {/* Dev Preview Tabs */}
      <div className="flex space-x-4 p-4 border-b sticky top-0 bg-white z-50">
        {['home', 'event', 'profile', 'hostdash', 'hostnew'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t as any)}
            className={`px-3 py-1 rounded ${tab === t ? 'bg-neutral-900 text-white' : 'bg-gray-100'}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'home' && <HomeScreen events={EVENTS} onSelect={handleSelect} />}
      {tab === 'event' && <EventDetail event={selected} onBack={() => setTab('home')} />}
      {tab === 'profile' && <ProfileScreen />}
      {tab === 'hostdash' && <HostDashboard />}
      {tab === 'hostnew' && <HostNewEvent />}
    </div>
  )
}
