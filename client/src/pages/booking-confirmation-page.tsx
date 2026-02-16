import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { format, differenceInDays } from "date-fns";
import { 
  CheckCircle, Calendar, Users, MapPin, CreditCard, 
  ArrowRight, Download, Share2 
} from 'lucide-react';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useBookingStore } from "@/stores/booking-store";
import { roomService } from "@/services/mock-api";
import type { Room, Booking } from "@/types/types";
import { toast } from "sonner"
import { useQueryClient, useQuery, useMutation,  } from "@tanstack/react-query";
import { createBooking, getSession } from "@/actions/private";


const BookingConfirmationPage = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const { currentBooking, clearCurrentBooking } = useBookingStore();
  const [room, setRoom] = useState<Room | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<Booking | null>(null);
  const queryClient = useQueryClient();

  const mutation = useMutation({
      mutationFn: createBooking,
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: ["bookings", user?.id],
        })

        setBookingDetails(data)
        setIsConfirmed(true)
        clearCurrentBooking()
        toast.success("Booking confirmed successfully!")
      },
  })

  const { data: session } = useQuery({
    queryKey: ["session"],
    queryFn: getSession,
  })

  const user = session?.user;


  useEffect(() => {
    if (!user) {
      navigate('/');
    }
    const fetchRoom = async () => {
      if (!roomId) return;
      
      const data = await roomService.getRoomById(roomId);
      setRoom(data);
    };

    fetchRoom();
  }, [roomId, user, navigate]);


  if (!currentBooking.dateRange.from || !currentBooking.dateRange.to || !room) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-3xl font-bold mb-4">No Booking Data</h1>
          <p className="text-muted-foreground mb-6">
            Please select dates and a room to make a booking.
          </p>
          <Link to="/rooms">
            <Button variant="gold">Browse Rooms</Button>
          </Link>
        </div>
      </div>
    );
  }

  const nights = differenceInDays(currentBooking.dateRange.to, currentBooking.dateRange.from);
  const subtotal = room.price * nights;
  const taxes = Math.round(subtotal * 0.12);
  const serviceFee = 25;
  const total = subtotal + taxes + serviceFee;

  const handleConfirmBooking = () => {
    if (!user || !room) return;

    mutation.mutate({
      user_id: user.id,
      room_id: room.id,
      room_name: room.name,
      room_image: room.images[0],
      check_in: currentBooking.dateRange.from!.toISOString(),
      check_out: currentBooking.dateRange.to!.toISOString(),
      guests: currentBooking.guests,
      total_price: total,
      status: 'confirmed',
    })
  }


  if (isConfirmed && bookingDetails) {
    return (
      <div className="min-h-screen bg-background py-24">
        <div className="container-luxury max-h-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 mb-6">
              <CheckCircle className="h-10 w-10" />
            </div>
            <h1 className="font-heading text-4xl font-bold mb-4">Booking Confirmed!</h1>
            <p className="text-muted-foreground text-lg">
              Your reservation has been successfully confirmed. A confirmation email has been sent to {user?.email}.
            </p>
          </motion.div>

          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm text-muted-foreground">Booking Reference</p>
                  <p className="font-mono text-lg font-semibold">{bookingDetails.id}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4"/>
                  </Button>
                </div>
              </div>

              <div className="flex gap-4 mb-6">
                <img 
                  src={room.images[0]}
                  alt={room.name}
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div className="font-heading text-xl font-semibold">
                  <h3 className="text-muted-foreground">{room.name}</h3>
                  <p className="text-muted-foreground">Lumière Hotel</p>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                    <MapPin className="h-3 w-3" />
                    <span>123 Luxury Avenure, Beverly Hills</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center py-4 bg-muted rounded-lg mb-6">
                <div>
                  <Calendar className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">Check-in</p>
                  <p className="font-medium">{format(bookingDetails.checkIn, 'MMM d, yyyy')}</p>
                  <p className="text-xs text-muted-foreground">3:00 PM</p>
                </div>
                <div>
                  <Calendar className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">Check-out</p>
                  <p className="font-medium">{format(bookingDetails.checkOut, 'MMM d, yyyy')}</p>
                  <p className="text-xs text-muted-foreground">11:00 AM</p>
                </div>
                <div>
                  <Users className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">Guests</p>
                  <p className="font-medium">{bookingDetails.guests}</p>
                </div>
              </div>

              <Separator className="mb-6" />

              <div className="flex justify-between items-center">
                <span className="font-semibold">Total Paid</span>
                <span className="font-heading text-2xl font-bold">${bookingDetails.totalPrice}</span>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button variant="gold" size="lg" className="w-full sm:w-auto">
                View My Bookings
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/">
              <Button variant="gold" size="lg" className="w-full sm:w-auto">
                Back To Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-24">
      <div className="container-luxury max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-heading text-4xl font-bold mb-2">Confirm Your Booking</h1>
          <p className="text-muted-foreground mb-8">
            Review your reservation deatails before confirming.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* left - details */}
          <motion.div
            initial={{ opacity: 0, x:  20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <h2 className="font-heading text-xl font-semibold mb-4">Your stay</h2>

                <div className="flex gap-4 mb-6">
                  <img 
                    src={room.images[0]}
                    alt={room.name}
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-heading text-lg font-semibold">{room.name}</h3>
                    <p className="text-muted-foreground text-sm">{room.bedType}</p>
                    <p className="text-sm">{room.size}</p>
                  </div>
                </div>

                <Separator className="my-4" />

                <h3 className="font-semibold mb-2">Guest Information</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="text-muted-foreground">Name:</span> {user?.user_metadata?.name}</p>
                  <p><span className="text-muted-foreground">Email:</span> {user?.user_metadata?.email}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* right - payment summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardContent className="p-6">
                <h2 className="font-heading text-xl font-semibold mb-4">Payment Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">${room.price} x {nights} nights</span>
                    <span>${subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Taxes & fees (12%)</span>
                    <span>${taxes}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Service fee</span>
                    <span>${serviceFee}</span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between items-center mb-6">
                  <span className="font-semibold text-lg">Total</span>
                  <span className="font-heading text-2xl font-bold">${total}</span>
                </div>

                <div className="bg-muted rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Pay at hotel</p>
                      <p className="text-xs text-muted-foreground">
                        No payment required now. Pay when you check in.
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  variant="gold"
                  size="lg"
                  className="w-full"
                  onClick={handleConfirmBooking}
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? 'Processing...' : 'Confirm Booking'}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  By confirming, you agree to our Terms of Service and Cancellation Policy. 
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default BookingConfirmationPage
