export interface DirectusRoom {
  id: string
  name: string
  type: 'standard' | 'deluxe' | 'suite' | 'penthouse'
  description: string
  short_description: string
  price: number
  originalPrice?: number
  available: boolean
  featured: boolean
  rating: number
  review_count: number
  capacity: number
  size: number
  bedType: string
  images?: { directus_files_id: string }[]
  cover_image: string
  amenities: string[]
}

export type DirectusRoomImage = { directus_files_id: string };

export interface DirectusSchema {
  rooms: DirectusRoom[];
}
