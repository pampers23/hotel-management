import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface ImageGalleryProps {
  images: string[];
  roomName: string;
}

const ImageGallery = ({ images, roomName }: ImageGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Main Image */}
        <motion.div
          className="relative aspect-[4/3] md:aspect-[3/2] rounded-xl overflow-hidden cursor-pointer group"
          onClick={() => setIsLightboxOpen(true)}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={images[currentIndex]}
            alt={`${roomName} - Main`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors" />
          
          {/* Navigation Arrows */}
          <Button
            variant="ghost"
            size="icon"
            className="cursor-pointer absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background shadow-md"
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background shadow-md"
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        </motion.div>

        {/* Thumbnail Grid */}
        <div className="grid grid-cols-2 gap-4">
          {images.slice(0, 4).map((image, index) => (
            <motion.div
              key={index}
              className={`relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer ${
                index === currentIndex ? 'ring-2 ring-gold' : ''
              }`}
              onClick={() => setCurrentIndex(index)}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <img
                src={image}
                alt={`${roomName} - View ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {index === currentIndex && (
                <div className="absolute inset-0 bg-gold/20" />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
        <DialogContent className="max-w-5xl p-0 bg-foreground/95">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative"
            >
              <img
                src={images[currentIndex]}
                alt={`${roomName} - View ${currentIndex + 1}`}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
              
              <Button
                variant="ghost"
                size="icon"
                className="cursor-pointer absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
                onClick={goToPrevious}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
                onClick={goToNext}
              >
                adasda
                <ChevronRight className="h-5 w-5" />
              </Button>
            </motion.div>
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImageGallery;