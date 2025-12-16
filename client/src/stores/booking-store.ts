import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Booking, DateRange } from "@/types/types";
import { mockBookings } from "@/data/data";

interface BookingState {
  bookings: Booking[];
  currentBooking: {
    roomId: string | null;
    dateRange: DateRange;
    guests: number;
  };
  setCurrentBooking: (roomId: string, dateRange: DateRange, guests: number) => void;
  clearCurrentBooking: () => void;
  addBooking: (booking: Booking) => void;
  getBookings: () => Booking[];
}

export const useBookingStore = create<BookingState>()(
  persist(
    (set, get) => ({
      bookings: mockBookings,
      currentBooking: {
        roomId: null,
        dateRange: { from: undefined, to: undefined },
        guests: 1,
      },

      setCurrentBooking: (roomId, dateRange, guests) => {
        set({
          currentBooking: { roomId, dateRange, guests },
        });
      },

      clearCurrentBooking: () => {
        set({
          currentBooking: {
            roomId: null,
            dateRange: { from: undefined, to: undefined },
            guests: 1,
          },
        });
      },

      addBooking: (booking) => {
        set((state) => ({
          bookings: [booking, ...state.bookings],
        }));
      },

      getBookings: () => get().bookings,
    }),
    {
      name: 'booking-storage',
    }
  )
);