import { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useSearchStore } from '@/stores/search-store';
import { useIsMobile } from '@/hooks/use-mobile';
import FilterContent from './filter-content';

const FilterSidebar = () => {
  const isMobile = useIsMobile();
  const { filters } = useSearchStore();
  const [priceRange, setLocalPriceRange] = useState<[number, number]>(
    filters.priceRange
  );
  

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
            {(filters.roomType.length > 0 || filters.amenities.length > 0) && (
              <span className="ml-1 px-1.5 py-0.5 text-xs bg-gold text-primary-foreground rounded-full">
                {filters.roomType.length + filters.amenities.length}
              </span>
            )}
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className="w-80 h-dvh overflow-y-auto px-4 pb-6">
          <SheetHeader>
            <SheetTitle className="font-heading">Filters</SheetTitle>
          </SheetHeader>

          <div className="mt-6">
            <FilterContent
              priceRange={priceRange}
              setLocalPriceRange={setLocalPriceRange}
            />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-72 bg-card rounded-xl border p-6 sticky top-24"
    >
      <h3 className="font-heading text-xl font-semibold mb-6">Filters</h3>

      <div className='mt-6'>
        <FilterContent
          priceRange={priceRange}
          setLocalPriceRange={setLocalPriceRange}
        />
      </div>
    </motion.div>
  );
};

export default FilterSidebar;