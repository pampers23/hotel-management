import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { format } from "date-fns"
import {
  Calendar,
  MapPin,
  Clock,
  User,
  Settings,
  ChevronRight,
  ExternalLink,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import type { Booking } from "@/types/types"
import { useQuery } from "@tanstack/react-query"
import { getBookings, getProfile, getSession } from "@/actions/private"

const statusStyle: Record<
  Booking["status"],
  {
    variant:
      | "default"
      | "secondary"
      | "destructive"
      | "gold"
      | "success"
      | "muted"
      | "outline"
    label: string
  }
> = {
  confirmed: { variant: "success", label: "Confirmed" },
  pending: { variant: "gold", label: "Pending" },
  completed: { variant: "success", label: "Completed" },
  cancelled: { variant: "destructive", label: "Cancelled" },
}

const DashboardPage = () => {
  const navigate = useNavigate()

  // 1) session
  const { data: session, isPending: isSessionPending } = useQuery({
    queryKey: ["session"],
    queryFn: getSession, // returns Session | null
  })

  const user = session?.user

  // 2) profile (depends on session.user.id)
  const { data: profile, isPending: isProfilePending } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: getProfile, // should return { displayName, avatarUrl } | null
    enabled: !!user?.id,
  })

  const { data: bookings = [], isPending: isBookingsPending } = useQuery({
    queryKey: ["bookings", user?.id],
    queryFn: () => getBookings(user!.id), // returns Booking[]
    enabled: !!user?.id,
  })

  // redirect if not logged in (after session is resolved)
  useEffect(() => {
    if (!isSessionPending && !session) {
      navigate("/")
    }
  }, [isSessionPending, session, navigate])

  const displayName =
    profile?.displayName ||
    user?.user_metadata?.name ||
    user?.user_metadata?.full_name ||
    user?.email ||
    "Guest"

  const avatarUrl =
    profile?.avatarUrl ||
    user?.user_metadata?.avatar_url ||
    user?.user_metadata?.picture ||
    null

  const upcomingBookings = bookings.filter(
    (b) => b.status === "confirmed" || b.status === "pending"
  )
  const pastBookings = bookings.filter(
    (b) => b.status === "completed" || b.status === "cancelled"
  )

  const BookingCard = ({ booking }: { booking: Booking }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="border rounded-xl overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="flex flex-col sm:flex-row">
        <img
          src={booking.roomImage}
          alt={booking.roomName}
          className="w-full sm:w-32 h-32 object-cover"
        />
        <div className="flex-1 p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant={statusStyle[booking.status].variant}>
                  {statusStyle[booking.status].label}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  #{booking.id}
                </span>
              </div>
              <h3 className="font-heading text-lg font-semibold">
                {booking.roomName}
              </h3>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3 w-3" />
                <span>Lumière Hotel</span>
              </div>
            </div>
            <div className="text-right">
              <p className="font-heading text-xl font-bold">
                ${booking.totalPrice}
              </p>
              <p className="text-xs text-muted-foreground">Total</p>
            </div>
          </div>

          <Separator className="my-3" />

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              <span>
                {format(booking.checkIn, "MMM d")} -{" "}
                {format(booking.checkOut, "MMM d, yyyy")}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <User className="h-3.5 w-3.5" />
              <span>
                {booking.guests} {booking.guests === 1 ? "Guest" : "Guests"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )

  // optional: avoid flashing dashboard before redirect
  if (isSessionPending || isBookingsPending) return null

  return (
    <div className="min-h-screen bg-muted/30">
      {/* header */}
      <section className="luxury-gradient py-12">
        <div className="container-luxury">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* avatar */}
              <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center overflow-hidden">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={displayName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-gold font-heading text-2xl">
                    {displayName.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>

              {/* name/email */}
              <div className="text-primary-foreground">
                <h1 className="font-heading text-2xl font-bold">
                  Welcome, {displayName.split(" ")[0]}!
                </h1>
                <p className="text-primary-foreground/70 text-sm">
                  {user?.email ?? ""}
                </p>
              </div>
            </div>

            {/* right side (optional) */}
            <div className="text-primary-foreground/70 text-sm">
              {isProfilePending ? "Loading profile..." : null}
            </div>
          </div>
        </div>
      </section>

      {/* content */}
      <section className="container-luxury py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-4">
                <nav className="space-y-1">
                  {[
                    { label: "My Bookings", icon: Calendar, active: true },
                    { label: "Profile", icon: User, active: false },
                    { label: "Preferences", icon: Settings, active: false },
                  ].map((item) => (
                    <button
                      key={item.label}
                      className={`cursor-pointer w-full flex items-center justify-between p-3 rounded-lg text-sm transition-colors ${
                        item.active
                          ? "bg-primary text-primary-foreground font-semibold"
                          : "hover:bg-gray-200"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </div>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Member Since</h3>
                <p className="text-sm text-muted-foreground">
                  {user?.created_at
                    ? format(new Date(user.created_at), "MMMM yyyy")
                    : "N/A"}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* main content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="upcoming">
              <div className="flex items-center justify-between mb-6">
                <TabsList>
                  <TabsTrigger value="upcoming" className="cursor-pointer">
                    Upcoming ({upcomingBookings.length})
                  </TabsTrigger>
                  <TabsTrigger value="past" className="cursor-pointer">
                    Past ({pastBookings.length})
                  </TabsTrigger>
                </TabsList>

                <Link to="/rooms">
                  <Button variant="gold" size="sm" className="gap-2 cursor-pointer">
                    Book New Stay
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </Link>
              </div>

              <TabsContent value="upcoming" className="space-y-4">
                {upcomingBookings.length === 0 ? (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="font-heading text-xl font-semibold mb-2">
                        No upcoming bookings
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Start planning your next luxury getaway.
                      </p>
                      <Link to="/rooms">
                        <Button className="cursor-pointer" variant="gold">Browse Rooms</Button>
                      </Link>
                    </CardContent>
                  </Card>
                ) : (
                  upcomingBookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                  ))
                )}
              </TabsContent>

              <TabsContent value="past" className="space-y-4">
                {pastBookings.length === 0 ? (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="font-heading text-xl font-semibold mb-2">
                        No past bookings
                      </h3>
                      <p className="text-muted-foreground">
                        Your booking history will appear here.
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  pastBookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                  ))
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </div>
  )
}

export default DashboardPage
