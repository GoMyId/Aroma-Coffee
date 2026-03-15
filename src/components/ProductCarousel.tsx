import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { useCart, useCurrency, formatPrice, DEFAULT_CURRENCY } from '@/integrations';
import type { CoffeeProducts } from '@/entities';

interface ProductCarouselProps {
  products: CoffeeProducts[];
}

export default function ProductCarousel({ products }: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const { addingItemId, actions } = useCart();
  const { currency } = useCurrency();

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, products.length]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
    }),
  };

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full">
      {/* Carousel Container */}
      <div className="relative overflow-hidden rounded-2xl">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="w-full"
          >
            <div className="bg-background rounded-2xl shadow-lg overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image Section */}
                <div className="relative h-[400px] md:h-[600px] overflow-hidden">
                  <Image
                    src={products[currentIndex].itemImage || 'https://static.wixstatic.com/media/c25388_0e94e181e9934d1ebd2fe08f26d4636c~mv2.png?originWidth=768&originHeight=576'}
                    alt={products[currentIndex].itemName || 'Coffee product'}
                    className="w-full h-full object-cover"
                    width={800}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
                </div>

                {/* Content Section */}
                <div className="flex flex-col justify-center p-12 md:p-16 lg:p-20">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <h3 className="font-heading text-4xl md:text-5xl lg:text-6xl text-primary mb-6">
                      {products[currentIndex].itemName}
                    </h3>
                    <p className="font-paragraph text-base md:text-lg text-foreground leading-relaxed mb-8">
                      {products[currentIndex].itemDescription}
                    </p>
                    {products[currentIndex].itemOrigin && (
                      <p className="font-paragraph text-sm text-foreground/70 mb-6">
                        Origin: <span className="font-semibold">{products[currentIndex].itemOrigin}</span>
                      </p>
                    )}
                    <div className="flex items-center gap-6 mb-8">
                      <span className="font-heading text-3xl md:text-4xl text-accent-gold font-bold">
                        {formatPrice(products[currentIndex].itemPrice || 0, currency ?? DEFAULT_CURRENCY)}
                      </span>
                    </div>
                    <button
                      onClick={() =>
                        actions.addToCart({
                          collectionId: 'coffeeproducts',
                          itemId: products[currentIndex]._id,
                          quantity: 1,
                        })
                      }
                      disabled={addingItemId === products[currentIndex]._id}
                      className="bg-accent-gold text-accent-gold-foreground font-paragraph font-semibold px-10 py-4 rounded-full text-base transition-all duration-300 hover:bg-accent-gold/90 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-3"
                    >
                      {addingItemId === products[currentIndex]._id ? (
                        <>Adding...</>
                      ) : (
                        <>
                          <ShoppingCart className="w-5 h-5" />
                          Add to Cart
                        </>
                      )}
                    </button>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-primary-foreground/90 hover:bg-primary-foreground text-primary p-3 rounded-full transition-all duration-300 hover:scale-110 z-10"
          aria-label="Previous product"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-primary-foreground/90 hover:bg-primary-foreground text-primary p-3 rounded-full transition-all duration-300 hover:scale-110 z-10"
          aria-label="Next product"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-3 mt-8">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex
                ? 'bg-accent-gold w-12 h-3'
                : 'bg-primary/30 w-3 h-3 hover:bg-primary/50'
            }`}
            aria-label={`Go to product ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
