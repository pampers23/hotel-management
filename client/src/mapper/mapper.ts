import type { Booking, BookingRow } from "@/types/types";

export function mapBooking(row: BookingRow): Booking {
  return {
    id: row.id,
    roomId: row.room_id,
    roomName: row.room_name,
    roomImage: row.room_image,
    checkIn: new Date(row.check_in),
    checkOut: new Date(row.check_out),
    guests: row.guests,
    totalPrice: row.total_price,
    status: row.status,
    createdAt: new Date(row.created_at),
  };
}
