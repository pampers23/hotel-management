export type User = {
  id: string
  email: string
  name: string
  avatar?: string
  phone?: string
  memberSince: Date
}

export type Booking = {
    id: string;
    roomId: string;
    roomName: string;
    roomImage: string;
    checkIn: Date;
    checkOut: Date;
    guests: number;
    totalPrice: number;
    status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
    createdAt: Date;
}

export type BookingRow = {
  id: string;
  room_id: string;
  room_name: string;
  room_image: string;
  check_in: string;
  check_out: string;
  guests: number;
  total_price: number;
  status: Booking["status"];
  created_at: string;
};

export type CreateBookingInput = {
  user_id: string;
  room_id: string;
  room_name: string;
  room_image: string;
  check_in: string;
  check_out: string;
  guests: number;
  total_price: number;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
}


export type DateRange = {
    from: Date | undefined;
    to: Date | undefined;
}

export type Room = {
    id: string;
    name: string;
    type: 'standard' | 'deluxe' | 'suite' | 'penthouse';
    description: string;
    shortDescription: string;
    price: number;
    originalPrice?: number;
    capacity: number;
    size: number;
    bedType: string;
    images: string[];
    amenities: string[];
    featured: boolean;
    available: boolean;
    rating: number;
    reviewCount: number;
}

export type SearchFilters = {
    checkIn: Date | null;
    checkOut: Date | null;
    guests: number;
    roomType: string[];
    priceRange: [number, number];
    amenities: string[];
}