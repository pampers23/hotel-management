import { ChevronDown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { amenitiesList, roomTypes } from '@/data/data';
import { useSearchStore } from '@/stores/search-store';

type FilterContentProps = {
  priceRange: [number, number];
  setLocalPriceRange: (value: [number, number]) => void;
};

const FilterContent = ({ priceRange, setLocalPriceRange }: FilterContentProps) => {
  const { filters, setRoomTypes, setPriceRange, setAmenities, resetFilters } =
    useSearchStore();

  const handleRoomTypeToggle = (type: string) => {
    const newTypes = filters.roomType.includes(type)
      ? filters.roomType.filter((t) => t !== type)
      : [...filters.roomType, type];
    setRoomTypes(newTypes);
  };

  const handleAmenityToggle = (amenity: string) => {
  const newAmenities = filters.amenities.includes(amenity)
    ? filters.amenities.filter((a) => a !== amenity)
    : [...filters.amenities, amenity];
  setAmenities(newAmenities);
  };


  return (
    <div className="space-y-6">
      {/* Price Range */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2">
          <h4 className="font-heading text-lg font-semibold">Price Range</h4>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4">
          <Slider
            value={priceRange}
            onValueChange={(value) =>
              setLocalPriceRange(value as [number, number])
            }
            onValueCommit={(value) =>
              setPriceRange(value as [number, number])
            }
            min={0}
            max={2000}
            step={50}
            className="w-full"
          />
          <div className="flex justify-between mt-3 text-sm text-muted-foreground">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}+</span>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Room Type */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2">
          <h4 className="font-heading text-lg font-semibold">Room Type</h4>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 space-y-3">
          {roomTypes.map((type) => (
            <label key={type.value} className="flex items-center gap-3 cursor-pointer">
              <Checkbox
                checked={filters.roomType.includes(type.value)}
                onCheckedChange={() => handleRoomTypeToggle(type.value)}
              />
              <span className="text-sm">{type.label}</span>
            </label>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* Amenities */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2">
          <h4 className="font-heading text-lg font-semibold">Amenities</h4>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 space-y-3">
          {amenitiesList.slice(0, 10).map((amenity) => (
            <label key={amenity} className="flex items-center gap-3 cursor-pointer">
              <Checkbox
                checked={filters.amenities.includes(amenity)}
                onCheckedChange={() => handleAmenityToggle(amenity)}
              />
              <span className="text-sm">{amenity}</span>
            </label>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* Reset Button */}
      <Button variant="outline" className="w-full cursor-pointer hover:bg-primary hover:text-white" onClick={resetFilters}>
        <X className="h-4 w-4 mr-2" />
        Clear All Filters
      </Button>
    </div>
  );
};

export default FilterContent;
