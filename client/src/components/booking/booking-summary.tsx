import { format, differenceInDays } from "date-fns";
import { motion } from "framer-motion";
import { CalendarIcon, Users, CreditCard } from 'lucide-react';
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useBookingStore } from "@/stores/booking-store";
// import { useAuthStore } from "@/stores/auth-store";
import type { Room, DateRange } from "@/types/types";
// import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { cn } from "@/lib/utils";


interface BookingSummaryProps {
  room: Room;
  onBookNow: () => void;
}

const BookingSummary = ({ room, onBookNow }: BookingSummaryProps) => {
  // const navigate = useNavigate();
  const { setCurrentBooking } = useBookingStore();
  // const { isAuthenticated } = useAuthStore();
  const [dateRange, setDateRange] = useState<DateRange>({
    from: undefined,
    to: undefined
  });
  const [guests, setGuests] = useState(1);

  const nights = dateRange.from && dateRange.to
    ? differenceInDays(dateRange.to, dateRange.from)
    : 0;
  
  const subtotal = room.price * nights;
  const taxes = Math.round(subtotal * 0.12);
  const serviceFee = 25;
  const total = subtotal + taxes + (nights > 0 ? serviceFee : 0);

  const handleBooking = () => {
    if (dateRange.from && dateRange.to) {
      setCurrentBooking(room.id, dateRange, guests);
      onBookNow();
    }
  };

  const isBookingReady = dateRange.from && dateRange.to && nights > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-xl border p-6 shadow-luxury sticky top-24"
    >
      {/* price header */}
      <div className="flex items-baseline gap-2 mb-6">
        <span className="font-heading text-3xl font-bold">${room.price}</span>
        {room.originalPrice && (
          <span className="text-lg text-muted-foreground">${room.originalPrice}</span>
        )}
        <span className="text-muted-foreground">/ night</span>
      </div>

      {/* date selection */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Check In</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                className={cn(
                  "w-full justify-start text-left font-normal mt-1 cursor-pointer",
                  !dateRange.from && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange.from ? format(dateRange.from, "MMM d") : "Add date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dateRange.from}
                onSelect={(date) => setDateRange((prev) => ({ ...prev, from: date }))}
                disabled={(date) => date < new Date()}
                initialFocus
                classNames={{
                  day: "relative p-0",
                  day_button: `
                    h-9 w-9 rounded-md
                    cursor-pointer
                    transition-colors
                    hover:bg-gold/20 hover:text-gold
                    focus:bg-gold/20 focus:text-gold
                    aria-selected:bg-gold
                    aria-selected:text-black
                  `,
                  day_today: "border border-gold",
                }}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Check Out</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
               variant='outline'
               className={cn(
                "w-full justify-start text-left font-normal mt-1 cursor-pointer",
                !dateRange.to && "text-muted-foreground"
               )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange.to ? format(dateRange.to, "MMM d") : "Add date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dateRange.to}
                onSelect={(date) => setDateRange((prev) => ({ ...prev, to: date }))}
                disabled={(date) => date < (dateRange.from || new Date())}
                initialFocus
                classNames={{
                  day: "relative p-0",
                  day_button: `
                    h-9 w-9 rounded-md
                    cursor-pointer
                    transition-colors
                    hover:bg-gold/20 hover:text-gold
                    focus:bg-gold/20 focus:text-gold
                    aria-selected:bg-gold
                    aria-selected:text-black
                  `,
                  day_today: "border border-gold",
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* guest */}
      <div className="mb-6">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Guests</label>
        <Select value={guests.toString()} onValueChange={(value) => setGuests(parseInt(value))}>
          <SelectTrigger className={cn(
              "h-w-full flex items-center transition-all duration-300",
              "hover:border-gold hover:ring-1 hover:ring-gold hover:text-gold",
              "data-[state=open]:border-gold data-[state=open]:ring-1 data-[state=open]:ring-gold",
              "cursor-pointer"
            )}>
            <Users className="mr-2 h-4 w-4 text-muted-foreground" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent
            className={cn(
              "z-50 rounded-xl border bg-background shadow-lg",
              "max-h-[15rem] md:max-h-[24rem] overflow-y-auto",
              "w-full md:w-auto"
            )}
          >
            {Array.from({ length: room.capacity }, (_, i) => i + 1).map((num) => (
              <SelectItem
               className={cn(
                    "cursor-pointer transition-colors py-2 px-4",
                    "hover:bg-gold/20 hover:text-gold",
                    "focus:bg-gold/20 focus:text-gold", 
                    "pl-4 !pr-4",
                    "relative"
                  )} 
               key={num} value={num.toString()}>
                {num} {num === 1 ? 'Guest' : 'Guests'}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* book button */}
      <Button
        variant="gold"
        size="lg"
        className="w-full mb-4 cursor-pointer"
        disabled={!isBookingReady}
        onClick={handleBooking}
      >
        <CreditCard className="h-4 w-4" />
        {isBookingReady ? 'Reserve Now' : 'Select Dates'}
      </Button>

      {isBookingReady && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="space-y-3 pt-4 border-t"
        >
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">${room.price} x {nights} nights</span>
            <span>${subtotal}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foregrounf">Service fee</span>
            <span>${serviceFee}</span>
          </div>
          <div className="flex justify-between font-semibold pt-3 border-t">
            <span>Total</span>
            <span className="text-lg">${total}</span>
          </div>
        </motion.div>
      )}

      <p className="text-xs text-center text-muted-foreground">You won't be charged yet</p>
    </motion.div>
  )
};

export default BookingSummary;