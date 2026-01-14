import type { Room, Booking, User, SearchFilters } from "@/types/types";
import { mockRooms, mockBookings, mockUser } from "@/data/data";

// stimulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const roomService = {
 async getRooms(filters?: Partial<SearchFilters>): Promise<Room[]> {
   await delay(500);

    let rooms = [...mockRooms];

    if (filters) {
      if (filters.roomType && filters.roomType.length > 0) {
        rooms = rooms.filter((room) => filters.roomType!.includes(room.type))
      }

      if (filters.priceRange) {
        rooms = rooms.filter(
          (room) => room.price >= filters.priceRange![0] && room.price <= filters.priceRange![1]
        );
      }

      if (filters.guests) {
        rooms = rooms.filter((room) => room.capacity >= filters.guests!);
      }

      if (filters.amenities && filters.amenities.length > 0) {
        rooms = rooms.filter((room) => 
          filters.amenities!.every((amenity) => room.amenities.includes(amenity))
        );
      }
    }

    return rooms;
 },

 async getRoomById(id: string): Promise<Room | null> {
   await delay(300);
   return mockRooms.find((room) => room.id === id) || null;
 },

 async getFeaturedRooms(): Promise<Room[]> {
  await delay(400);
  return mockRooms.filter((room) => room.featured);
 },

 async checkAvailability(roomId: string, checkIn: Date, checkOut: Date): Promise<boolean> {
  await delay(300);
  // mock availability check - always available for demo
  console.log(roomId, checkIn, checkOut);
  return true;  
 },
};

export const bookingService = {
  async getBookings(userId: string): Promise<Booking[]> {
    await delay(400);
    console.log(userId);
    return mockBookings;
  },
  
  async createBooking(BookingData: Omit<Booking, 'id' | 'createdAt'>): Promise<Booking> {
    await delay(600);
    const newBooking: Booking = {
      ...BookingData,
      id: `BK${Date.now()}`,
      createdAt: new Date(),
    };
    return newBooking;
  },

  async cancelBooking(bookingId: string): Promise<boolean> {
    await delay(400);
    console.log(bookingId);
    return true;
  }
};

export const authService = {
  async login(email: string, password: string): Promise<{ user: User | null; error?: string }> {
    await delay(600);

    if (email && password.length >= 6) {
      return { user: { ...mockUser, email } };
    }

    return { user: null, error: 'Invalid credentials' };
  },

  async register(name: string, email: string, password: string): Promise<{ user: User | null; error?: string }> {
    await delay(800);

    if (name && email && password.length >= 6) {
      return { user: { ...mockUser, name, email } };
    }

    return { user: null, error: 'Registration failed' };
  },

  async getCurrentUser(): Promise<User | null> {
    await delay(300);
    return null
  }
}