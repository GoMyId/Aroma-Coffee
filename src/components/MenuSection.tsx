import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { useCurrency, formatPrice, DEFAULT_CURRENCY } from '@/integrations';
import type { CoffeeMenu } from '@/entities';

interface MenuSectionProps {
  menuItems: CoffeeMenu[];
}

export default function MenuSection({ menuItems }: MenuSectionProps) {
  const { currency } = useCurrency();

  // Group menu items by category
  const groupedItems = menuItems.reduce((acc, item) => {
    const category = item.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, CoffeeMenu[]>);

  const categories = Object.keys(groupedItems);

  return (
    <div className="space-y-16">
      {categories.map((category, categoryIndex) => (
        <div key={category}>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
            className="font-heading text-3xl md:text-4xl text-primary mb-8 text-center"
          >
            {category}
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {groupedItems[category].map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-secondary rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {item.itemImage && (
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={item.itemImage}
                      alt={item.itemName || 'Menu item'}
                      className="w-full h-full object-cover"
                      width={400}
                    />
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-heading text-xl md:text-2xl text-primary font-semibold">
                      {item.itemName}
                    </h4>
                    <span className="font-heading text-xl text-accent-gold font-bold whitespace-nowrap ml-4">
                      {formatPrice(item.price || 0, currency ?? DEFAULT_CURRENCY)}
                    </span>
                  </div>
                  
                  {item.description && (
                    <p className="font-paragraph text-sm text-foreground/80 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
