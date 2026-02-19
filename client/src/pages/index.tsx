import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, ArrowRight, Sparkles, Shield, Clock, Award } from "lucide-react";
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import SearchWidget from "@/components/booking/search-widget";
import RoomCard from "@/components/rooms/room-card";
import { roomService } from "@/services/mock-api";
import type { Room } from "@/types/types";
import SkeletonLoader from "@/components/ui/skeleton-loader";
import heroImage from '@/assets/hero-hotel.jpg';



const Index = () => {
  const [featuredRooms, setFeaturedRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      const rooms = await roomService.getFeaturedRooms();
      setFeaturedRooms(rooms);
      setIsLoading(false);
    };
    fetchRooms();
  }, []);

  const features = [
    {
      icon: <Sparkles className="h-6 w-6"/>,
      title: 'Luxury experience',
      description: 'Every detail crafted for your comfort and pleasure.'
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Secure Booking',
      description: 'Your reservation are protected with enterprise-grade security.',
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: '24/7 Concierge',
      description: 'Our dedicated team is always available to assist you.',
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: 'Award Winning',
      description: 'Recognized globally for exceptional hospitality.',
    }
  ];

  return (
    <div className="min-h-screen">
      {/* hero section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* background image */}
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Lumière Hotel Lobby"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-from-foreground/60 via-foreground/40 to-background" />
        </div>

        {/* content */}
        <div className="relative z-10 container-luxury text-center text-primary-foreground">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge variant="gold" className="mb-6 text-sm px-4 py-1">
                <Star className="h-3 w-3 mr-1 fill-current" />
                5-Star Luxury Hotel
              </Badge>

              <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Where Elegance<br />Meets Comfort
              </h1>

              <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-8">
                Discover unparalled luxury at Lumière Hotel. Experience world-class amenities,
                breathtaking views, and service that exceeds every expectation.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/rooms">
                  <Button variant="gold" size="xl" className="cursor-pointer">
                    Explore Rooms
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Button variant="heroOutline" size="xl" className="cursor-pointer">

                    Virtual Tour
                </Button>
              </div>
            </motion.div>
        </div>

        {/* scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex items-start justify-center p-2">
            <motion.div
              className="w-1.5 h-3 bg-gold rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </div>
        </motion.div>
      </section>

      {/* search widget */}
      <section className="relative z-20 -mt-24 pb-16">
        <div className="container-luxury">
            <SearchWidget />
        </div>
      </section>

      {/* features */}
      <section className="section-padding bg-muted">
        <div className="container-luxury">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gold/10 text-gold mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-heading text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            ))}
         </div>
        </div>
      </section>

      {/* featured rooms */}
      <section className="section-padding">
        <div className="container-luxury">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
            <div>
              <h2 className="font-heading text-4xl font-bold mb-2">Featured Rooms</h2>
              <p className="text-muted-foreground">
                Discover our most sought-after accommodations
              </p>
            </div>
            <Link to="/rooms">
              <Button variant="outline" className="gap-2">
                View All Rooms
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading
               ? Array.from({ length: 3 }).map((_, i) => (
                  <SkeletonLoader key={i} type="card" />
               ))
               : featuredRooms.slice(0, 3).map((room, index) => (
                  <RoomCard key={room.id} room={room} index={index}/>
               ))
            }
          </div>
        </div>
      </section>

      {/* cta section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 luxury-gradient" />
        <div className="relative z-10 container-luxury text-center text-primary-foreground">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              Ready to Experience Luxury?
            </h2>
            <p className="text-lg text-primary-foreground/80 max-w-xl mx-auto mb-8">
              Book your stay today and receive exclusive member benefits,
              complimentary upgrades, and personalized services.
            </p>
            <Link to="/rooms">
              <Button variant="gold" size="xl">
                Book Your Stay
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Index
