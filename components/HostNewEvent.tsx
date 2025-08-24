export default function HostNewEvent() {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-neutral-100">
        <div className="mx-auto max-w-md px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-extrabold tracking-tight">New Event</h1>
          <button className="px-3 py-1.5 rounded-xl bg-neutral-900 text-white text-sm active:scale-95">Save</button>
        </div>
      </header>

      <main className="mx-auto max-w-md px-4 pb-24">
        <form className="space-y-5 pt-4">
          <div>
            <label className="text-sm font-semibold">Cover Image</label>
            <div className="mt-2 rounded-2xl border border-dashed border-neutral-300 p-6 text-center">
              <p className="text-sm text-neutral-500">Tap to upload a photo</p>
              <input type="file" accept="image/*" className="hidden" />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold">Title</label>
            <input type="text" placeholder="e.g., Traditional Tea Ceremony" className="mt-2 w-full rounded-xl border border-neutral-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900" />
          </div>

          <div>
            <label className="text-sm font-semibold">Description</label>
            <textarea rows={5} placeholder="What will guests do, what's included, where to meet..." className="mt-2 w-full rounded-xl border border-neutral-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-semibold">Price (KRW)</label>
              <input type="number" placeholder="30000" className="mt-2 w-full rounded-xl border border-neutral-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900" />
            </div>
            <div>
              <label className="text-sm font-semibold">Capacity</label>
              <input type="number" placeholder="20" className="mt-2 w-full rounded-xl border border-neutral-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-semibold">Date</label>
              <input type="date" className="mt-2 w-full rounded-xl border border-neutral-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900" />
            </div>
            <div>
              <label className="text-sm font-semibold">Time</label>
              <input type="time" className="mt-2 w-full rounded-xl border border-neutral-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900" />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold">Location</label>
            <input type="text" placeholder="Address or meeting point" className="mt-2 w-full rounded-xl border border-neutral-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900" />
          </div>
        </form>
      </main>
    </div>
  )
}
