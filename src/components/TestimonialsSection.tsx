import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Image } from '@/components/ui/image';
import type { Testimonials } from '@/entities';

interface TestimonialsSectionProps {
  testimonials: Testimonials[];
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating ? 'fill-accent-gold text-accent-gold' : 'text-primary/20'
        }`}
      />
    ));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {testimonials.map((testimonial, index) => (
        <motion.div
          key={testimonial._id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-secondary rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {/* Rating */}
          <div className="flex gap-1 mb-4">
            {renderStars(testimonial.rating || 0)}
          </div>

          {/* Review Text */}
          <p className="font-paragraph text-base text-foreground leading-relaxed mb-6 italic">
            "{testimonial.reviewText}"
          </p>

          {/* Customer Info */}
          <div className="flex items-center gap-4 pt-4 border-t border-primary/10">
            {testimonial.customerPhoto && (
              <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={testimonial.customerPhoto}
                  alt={testimonial.customerName || 'Customer'}
                  className="w-full h-full object-cover"
                  width={48}
                />
              </div>
            )}
            <div>
              <p className="font-heading text-lg text-primary font-semibold">
                {testimonial.customerName}
              </p>
              {testimonial.customerLocation && (
                <p className="font-paragraph text-sm text-foreground/60">
                  {testimonial.customerLocation}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
