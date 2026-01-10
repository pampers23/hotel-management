export type User = {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    phone?: string;
    memberSince: Date;
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
    amenties: string[];
}