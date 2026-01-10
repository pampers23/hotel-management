import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Star, Users, Maximize, Wifi, Coffee, Tv } from 'lucide-react';
import type { Room } from "@/types/types";
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface RoomCardProps {
  room: Room;
  index?: number;
}

const amenityIcons: Record<string, React.ReactNode> = {
  Wifi: <Wifi className="h-3.5 w-3.5" />,
  'Coffee Maker': <Coffee className="h-3.5 w-3.5" />,
  'Smart TV': <Tv className="h-3.5 w-3.5" />
}

const RoomCard = ({ room, index = 0 }: RoomCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Card hover className="overflow-hidden group">
        {/* image */}
        <div className="relative overflow-hidden aspect-[4/3]">
          <img 
            src={room.images[0]}
            alt={room.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />

          {/* badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            {room.featured && (
              <Badge variant="gold">Featured</Badge>
            )}
            {room.originalPrice && (
              <Badge variant="destructive">
                {Math.round((1 - room.price / room.originalPrice) * 100)} % OFF
              </Badge>
            )}
          </div>

          {/* price */}
          <div className="absolute bottom-4 left-4 text-primary-foreground">
            <div className="flex items-baseline gap-2">
              <span className="font-heading text-2xl font-bold">${room.price}</span>
              {room.originalPrice && (
                <span className="text-sm line-through opacity-70">${room.originalPrice}</span>
              )}
              <span className="text-sm opacity-80">/night</span>
            </div>
          </div>

          {/* rating */}
          <div className="absolute bottom-4 right-4 flex items-center gap-1 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-full">
            <Star className="h-3.5 w-3.5 fill-gold text-gold" />
            <span className="text-sm font-medium">{room.rating}</span>
            <span className="text-xs text-muted-foreground">({room.reviewCount})</span>
          </div>
        </div>

        <CardContent className="p-5">
          {/* header */}
          <div className="mb-3">
            <Badge variant="muted" className="mb-2 capitalize">{room.type}</Badge>
            <h3 className="font-heading text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
              {room.name}
            </h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {room.shortDescription}
            </p>
          </div>

          {/* features */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{room.capacity} Guests</span>
            </div>
            <div className="flex items-center gap-1">
              <Maximize className="h-4 w-4" />
              <span>{room.size} sq ft</span>
            </div>
          </div>

          {/* amenities review */}
          <div className="flex flex-wrap gap-2 mb-4">
            {room.amenities.slice(0, 3).map((amenity) => (
              <span
                key={amenity}
                className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full"
              >
                {amenityIcons[amenity] || null}
                {amenity}
              </span>
            ))}
            {room.amenities.length > 3 && (
              <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                +{room.amenities.length - 3} more
              </span>
            )}
          </div>

          {/* action */}
          <Link to={`/rooms/${room.id}`}>
            <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              View Details
            </Button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default RoomCard
