import { createDirectus, rest } from "@directus/sdk";

type Schema = {
  rooms: {
    id: string
    name: string
    type: string
    description: string
    price: number
    originalPrice?: number
    capacity: number
    size: number
    bedType: string
    amenities: string[]
    featured: boolean
    available: boolean
    rating: number
    reviewCount: number
  }  
}

export const directus = createDirectus<Schema>(
  import.meta.env.VITE_DIRECTUS_URL  
).with(rest())