import { useEffect, useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Grid, List, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import RoomCard from "@/components/rooms/room-card"
import FilterSidebar from "@/components/rooms/filter-sidebar"
import SkeletonLoader from "@/components/ui/skeleton-loader"
import { roomService } from "@/services/mock-api"
import { useSearchStore } from "@/stores/search-store"
import type { Room } from "@/types/types"
import { useIsMobile } from "@/hooks/use-mobile"


const RoomsPage = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { filters } = useSearchStore();
  const isMobile = useIsMobile();

  useEffect(() => {
    const fetchRooms = async () => {
      setIsLoading(true);
      const data = await roomService.getRooms(filters);
      setRooms(data);
      setIsLoading(false);
    };
    fetchRooms();
  }, [filters]);

  const sortedRooms = useMemo(() => {
    const sorted = [...rooms];
    switch (sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'featured':    
      default:
        return sorted.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
  }, [rooms, sortBy]);

//   const activeFiltersCount = filters.roomType.length + filters.amenities.length;

  return (
    <div className="min-h-screen bg-background">
      {/* header */}
      <section className="luxury-gradient py-16 md:py-24">
        <div className="container-luxury text-center text-primary-foreground">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
                Our Rooms & Suites
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Discover our collection of elegantly appointed rooms and suites,
              each designed to provide the ultimate in comfort and luxury.
            </p>
          </motion.div>
        </div>
      </section>

      {/* content */}
      <section className="section-padding">
        <div className="container-luxury">
           <div className="flex flex-col lg:flex-row gap-8">
              {/* sidebar - desktop only */}
              {!isMobile && <FilterSidebar />}

              {/* main content */}
              <div className="flex-1 ">
                {/* toolbar */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                  <div className="flex items-center gap-4">
                    {isMobile && <FilterSidebar />}
                    <p className="text-muted-foreground">
                      {isLoading ? 'Loading...' : `${sortedRooms.length} rooms available`}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* sort */}
                    <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40">
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent className="bg-white cursor-pointer">
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                    </SelectContent>
                  </Select>

                    {/* view mode - desktop only */}
                    <div className="hidden sm:flex items-center border rounded-lg">
                      <Button
                        variant={viewMode === 'grid' ? 'default' : 'ghost'}
                        size="icon"
                        className="rounded-r-none cursor-pointer"
                        onClick={() => setViewMode('grid')}
                      >
                        <Grid className="h-4 w-4" />  
                      </Button> 
                      <Button
                        variant={viewMode === 'list' ? 'default' : 'ghost'}
                        size="icon"
                        className="rounded-l-none cursor-pointer"
                        onClick={() => setViewMode('list')}
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* rooms grid */}
                <div
                  className={`grid gap-8 ${
                    viewMode === 'grid'
                      ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
                      : 'grid-cols-1'
                  }`}
                >
                   {isLoading
                     ? Array.from({ length: 6 }).map((_, i) => (
                        <SkeletonLoader key={i} type="card" />
                     ))
                     : sortedRooms.map((room, index) => (
                        <RoomCard key={room.id} room={room} index={index} />
                     ))
                   }
                </div>

                {/* empty state */}
                {!isLoading && sortedRooms.length === 0 && (
                   <div className="text-center py-16">
                    <h3 className="font-heading text-2xl font-semibold mb-2">
                       No rooms found
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Try adjusting your filters to see more options.
                    </p>
                    <Button className="cursor-pointer" variant="outline" onClick={() => window.location.reload()}>
                      Reset Filters
                    </Button>
                   </div>
                )}
              </div>
           </div> 
        </div>
      </section>
    </div>
  )
}

export default RoomsPage