import { create } from "zustand";
import type { DateRange } from "@/types/types";

interface BookingState {
  currentBooking: {
    roomId: string | null;
    dateRange: DateRange;
    guests: number;
  };
  setCurrentBooking: (roomId: string, dateRange: DateRange, guests: number) => void;
  clearCurrentBooking: () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
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
}));