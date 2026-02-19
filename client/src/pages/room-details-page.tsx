import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Star, Users, Maximize, Check, ArrowLeft, Wifi, Coffee, Tv, Bath, Wind, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ImageGallery from "@/components/rooms/image-gallery"
import BookingSummary from "@/components/booking/booking-summary"
import AuthModal from "@/components/auth/auth-modal"
import { roomService } from "@/services/mock-api"
import { useAuthStore } from "@/stores/auth-store"
import type { Room } from "@/types/types"
import SkeletonLoader from "@/components/ui/skeleton-loader"
import { toast } from "sonner"


const amenityIcons: Record<string, React.ReactNode> = {
    'WiFi': <Wifi className="h-5 w-5" />,
    'Coffee Maker': <Coffee className="h-5 w-5" />,
    'Smart TV': <Tv className="h-5 w-5" />,
    'Soaking Tub': <Bath className="h-5 w-5" />,
    'Jacuzzi': <Bath className="h-5 w-5" />,
    'Air conditioning': <Wind className="h-5 w-5" />,
    'Safe': <Lock className="h-5 w-5" />
}


const RoomDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [room, setRoom] = useState<Room | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    const fetchRoom = async () => {
      if (id) {
        const  data = await roomService.getRoomById(id);
        setRoom(data);
        setIsLoading(false);
      }
    };
    fetchRoom();
  }, [id]);

  const handleBookNow = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
    } else {
      toast.success('Booking initiated! Redirecting to cnfirmation...' );
      navigate(`/booking/confirm/${room?.id}`);
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background py-24">
        <div className="container-luxury">
          <SkeletonLoader type="image" className="w-full h-96 rounded-xl mb-8" />
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <SkeletonLoader className="h-8 w-1/2" />
              <SkeletonLoader className="h-4 w-full" />
              <SkeletonLoader className="h-8 w-3/4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-3xl font-bold mb-4">Room Not Found</h1>
          <Button onClick={() => navigate('/rooms')}>Back to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <>
     <div className="min-h-screen bg-background">
        {/* back button */}
        <div className="container-luxury pt-6">
          <Button
            variant="ghost"
            className="gap-2 cursor-pointer hover:bg-gold"
            onClick={() => navigate('/rooms')}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Rooms
          </Button>
        </div>

        {/* gallery */}
        <section className="container-luxury py-8">
          <ImageGallery images={room.images} roomName={room.name} />
        </section>

        {/* content */}
        <section className="container-luxury pb-16">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* main content */}
            <div className="lg:col-span-2">
              {/* header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Badge variant="muted" className="capitalize">{room.type}</Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-gold text-gold" />
                    <span className="font-medium">{room.rating}</span>
                    <span className="text-muted-foreground">({room.reviewCount} reviews)</span>
                  </div>
                </div>
                <h1 className="font-heading text-4xl font-bold mb-4">{room.name}</h1>

                {/* quick info */}
                <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    <span>Up to {room.capacity} guests</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Maximize className="h-5 w-5" />
                    <span>{room.size} sq ft</span>
                  </div>
                  <span>{room.bedType}</span>
                </div>
              </motion.div>

              <Separator className="mb-8" />

              {/* description */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="mb-8"
              >
                <h2 className="font-heading text-2xl font-semibold mb-4">About This Room</h2>
                <p className="text-muted-foreground leading-relaxed">{room.description}</p>
              </motion.div>

              {/* tabs */}
              <Tabs defaultValue="amenities" className="mb-8">
                <TabsList className="w-full justify-start">
                  <TabsTrigger className="cursor-pointer" value="amenities">Amenities</TabsTrigger>
                  <TabsTrigger className="cursor-pointer" value="policies">Policies</TabsTrigger>
                  <TabsTrigger className="cursor-pointer" value="reviews">Reviews</TabsTrigger>
                </TabsList>

                <TabsContent value="amenities" className="pt-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {room.amenities.map((amenity) => (
                      <div
                        key={amenity}
                        className="flex items-center gap-3 p-3 rounded-lg bg-muted"
                      >
                        {amenityIcons[amenity] || <Check className="h-5 w-5 text-gold" />}
                        <span className="text-sm">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="policies" className="pt-6 space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Check-in</span>
                      <span className="font-medium">3:00 PM</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Check-out</span>
                      <span className="font-medium">11:00 AM</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Pets</span>
                      <span className="font-medium">Not allowed</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Smoking</span>
                      <span className="font-medium">Not allowed</span>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="pt-6">
                  <div className="space-y-6">
                    {[
                      { name: 'Sarah M.', rating: 5, comment: 'Absolutely stunning room with incredible views. The service was impeccable.', date: 'November 2024' },
                      { name: 'John D.', rating: 5, comment: 'The best hotel experience I\'ve ever had. Every detail was perfect.', date: 'October 2024' },
                      { name: 'Emily R.', rating: 4, comment: 'Beautiful room and great amenities. Would definitely stay again.', date: 'October 2024' },
                    ].map((review, i) => (
                      <div key={i} className="border-b pb-6 last:border-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-medium">
                              {review.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium">{review.name}</p>
                              <p className="text-xs text-muted-foreground">{review.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-0.5">
                            {Array.from({ length: review.rating }).map((_, j) => (
                              <Star key={j} className="h-4 w-4 fill-gold text-gold" />
                            ))}
                          </div>
                        </div>
                        <p className="text-muted-foreground">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* booking widget */}
            <div className="lg:col-span-1">
              <BookingSummary room={room} onBookNow={handleBookNow} />
            </div>
          </div>
        </section>
      </div> 

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode="login"
      />
    </>
  )
}

export default RoomDetailsPage
