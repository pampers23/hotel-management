import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { SearchFilters, DateRange } from "@/types/types";

interface SearchState {
    filters: SearchFilters;
    setDateRange: (dateRange: DateRange) => void;
    setGuests: (guests: number) => void;
    setRoomTypes: (roomType: string[]) => void;
    setPriceRange: (priceRange: [number, number]) => void;
    setAmenities: (amenties: string[]) => void;
    resetFilters: () => void;
}

const defaultFilters: SearchFilters = {
    checkIn: null,
    checkOut: null,
    guests: 1,
    roomType: [],
    priceRange: [0, 2000],
    amenities: [],
};

export const useSearchStore = create<SearchState>()(
    persist(
        (set) => ({
            filters: defaultFilters,

            setDateRange: (dateRange) => {
                set((state) => ({
                    filters: {
                        ...state.filters,
                        checkIn: dateRange.from || null,
                        checkOut: dateRange.to || null,
                    }
                }))
            },

            setGuests: (guests) => {
                set((state) => ({
                    filters: { ...state.filters, guests },
                }));
            },

            setRoomTypes: (types) => {
                set((state) => ({
                    filters: { ...state.filters, roomType: types },
                }));
            },

            setPriceRange: (range) => {
                set((state) => ({
                    filters: { ...state.filters, priceRange: range },
                }));
            },

            setAmenities: (amenities) => {
                set((state) => ({
                    filters: { ...state.filters, amenities },
                }));
            },

            resetFilters: () => {
                set({ filters: defaultFilters });
            },
        }),
        {
            name: "search-storage",
        }
    )
)