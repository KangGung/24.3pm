export type EventItem = {
  id: number
  slug: string
  title: string
  city: string
  language: string[]
  date: string
  priceKRW: number
  image: string
  cover?: string
  description: string
  host: { name: string; avatar: string }
}
