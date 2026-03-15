import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import type { ShopGallery } from '@/entities';

interface GallerySectionProps {
  images: ShopGallery[];
}

export default function GallerySection({ images }: GallerySectionProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {images.map((item, index) => (
        <motion.div
          key={item._id}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          className="relative group overflow-hidden rounded-2xl shadow-lg cursor-pointer"
          style={{ height: index % 3 === 0 ? '400px' : '300px' }}
        >
          <Image
            src={item.image || 'https://static.wixstatic.com/media/c25388_8884ea8c41fb4123bd53359d2c46e126~mv2.png?originWidth=576&originHeight=384'}
            alt={item.altText || item.caption || 'Gallery image'}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            width={600}
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-6">
              {item.caption && (
                <p className="font-paragraph text-base text-primary-foreground font-semibold mb-2">
                  {item.caption}
                </p>
              )}
              {item.category && (
                <p className="font-paragraph text-sm text-primary-foreground/80">
                  {item.category}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
