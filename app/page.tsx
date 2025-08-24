'use client'

import { useState } from 'react'
import HomeScreen from '../components/HomeScreen'
import EventDetail from '../components/EventDetail'
import ProfileScreen from '../components/ProfileScreen'
import HostDashboard from '../components/HostDashboard'
import HostNewEvent from '../components/HostNewEvent'

export default function PreviewApp() {
  const [tab, setTab] = useState<'home' | 'event' | 'profile' | 'hostdash' | 'hostnew'>('home')

  return (
    <div className="min-h-screen">
      <div className="flex space-x-4 p-4 border-b sticky top-0 bg-white z-50">
        {['home', 'event', 'profile', 'hostdash', 'hostnew'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t as any)}
            className={`px-3 py-1 rounded ${tab === t ? 'bg-sky-500 text-white' : 'bg-gray-100'}`}
          >
            {t}
          </button>
        ))}
      </div>
      {tab === 'home' && <HomeScreen />}
      {tab === 'event' && <EventDetail />}
      {tab === 'profile' && <ProfileScreen />}
      {tab === 'hostdash' && <HostDashboard />}
      {tab === 'hostnew' && <HostNewEvent />}
    </div>
  )
}
