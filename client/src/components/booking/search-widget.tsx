import { format } from "date-fns";
import { CalendarIcon, Users, Search } from 'lucide-react';
import { motion } from "framer-motion";
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
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useSearchStore } from "@/stores/search-store";
import type { DateRange } from "@/types/types";
import { useNavigate} from "react-router-dom"
import { useState } from "react";
import { cn } from "@/lib/utils";


const SearchWidget = () => {
  const navigate = useNavigate();
  const { filters, setDateRange, setGuests } = useSearchStore();
  const [dateRange, setLocalDateRange] = useState<DateRange>({
    from: filters.checkIn || undefined,
    to: filters.checkOut || undefined
  });
  const [guests, setLocalGuests] = useState(filters.guests);

  const handleSearch = () => {
    setDateRange(dateRange);
    setGuests(guests);
    navigate('/rooms');
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="glass-card rounded-2xl p-4 md:p-6 shadow-luxury"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* check in date */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">Check In</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal h-12",
                  !dateRange.from && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange.from ? format(dateRange.from, "MMM dd, yyyy") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dateRange.from}
                onSelect={(date) => setLocalDateRange((prev) => ({ ...prev, from: date }))}
                disabled={(date) => date < new Date()}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* check out date */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">Check Out</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal h-12",
                  !dateRange.to && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange.to ? format(dateRange.to, "MMM dd, yyyy") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dateRange.to}
                onSelect={(date) => setLocalDateRange((prev) => ({ ...prev, to: date }))}
                disabled={(date) => date < (dateRange.from || new Date())}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* guests */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">Guests</Label>
          <Select value={guests.toString()} onValueChange={(value) => setLocalGuests(parseInt(value))}>
            <SelectTrigger className="h-12">
              <Users className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Select guests" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} Guest{num > 1 ? 's' : ''}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* search button */}
        <div className="flex items-end">
          <Button onClick={handleSearch} className="w-full h-12 bg-primary hover:bg-primary/90">
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

export default SearchWidget;


