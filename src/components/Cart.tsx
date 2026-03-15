import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart, useCurrency, formatPrice, DEFAULT_CURRENCY } from '@/integrations';
import { Image } from '@/components/ui/image';

export default function Cart() {
  const { items, totalPrice, isOpen, isCheckingOut, actions } = useCart();
  const { currency } = useCurrency();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={actions.closeCart}
            className="fixed inset-0 bg-primary/60 backdrop-blur-sm z-50"
          />

          {/* Cart Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[450px] bg-background shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-primary/10">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-accent-gold" />
                <h2 className="font-heading text-2xl text-primary font-semibold">
                  Your Cart
                </h2>
              </div>
              <button
                onClick={actions.closeCart}
                className="p-2 hover:bg-secondary rounded-full transition-colors duration-200"
              >
                <X className="w-6 h-6 text-primary" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-16 h-16 text-primary/20 mb-4" />
                  <p className="font-paragraph text-lg text-foreground/60 mb-2">
                    Your cart is empty
                  </p>
                  <p className="font-paragraph text-sm text-foreground/40">
                    Add some delicious coffee to get started!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="bg-secondary rounded-xl p-4 flex gap-4"
                    >
                      {/* Item Image */}
                      {item.image && (
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            width={80}
                          />
                        </div>
                      )}

                      {/* Item Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-heading text-lg text-primary font-semibold mb-1 truncate">
                          {item.name}
                        </h3>
                        <p className="font-paragraph text-base text-accent-gold font-bold mb-3">
                          {formatPrice(item.price, currency ?? DEFAULT_CURRENCY)}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => actions.updateQuantity(item, item.quantity - 1)}
                            className="p-1.5 bg-background hover:bg-primary/10 rounded-lg transition-colors duration-200"
                          >
                            <Minus className="w-4 h-4 text-primary" />
                          </button>
                          <span className="font-paragraph text-base text-primary font-semibold min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => actions.updateQuantity(item, item.quantity + 1)}
                            className="p-1.5 bg-background hover:bg-primary/10 rounded-lg transition-colors duration-200"
                          >
                            <Plus className="w-4 h-4 text-primary" />
                          </button>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => actions.removeFromCart(item)}
                        className="p-2 hover:bg-destructive/10 rounded-lg transition-colors duration-200 self-start"
                      >
                        <Trash2 className="w-5 h-5 text-destructive" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-primary/10 p-6 space-y-4">
                {/* Total */}
                <div className="flex items-center justify-between">
                  <span className="font-heading text-xl text-primary font-semibold">
                    Total
                  </span>
                  <span className="font-heading text-2xl text-accent-gold font-bold">
                    {formatPrice(totalPrice, currency ?? DEFAULT_CURRENCY)}
                  </span>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={actions.checkout}
                  disabled={isCheckingOut}
                  className="w-full bg-accent-gold text-accent-gold-foreground font-paragraph font-semibold px-8 py-4 rounded-full text-base transition-all duration-300 hover:bg-accent-gold/90 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
                </button>

                {/* Continue Shopping */}
                <button
                  onClick={actions.closeCart}
                  className="w-full bg-transparent border-2 border-primary text-primary font-paragraph font-semibold px-8 py-3 rounded-full text-base transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
