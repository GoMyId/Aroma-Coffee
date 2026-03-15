import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { useCart } from '@/integrations';
import Cart from '@/components/Cart';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { itemCount, actions } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#menu', label: 'Menu' },
    { href: '#products', label: 'Products' },
    { href: '#gallery', label: 'Gallery' },
    { href: '#contact', label: 'Contact' },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-background/95 backdrop-blur-md shadow-md' : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-[100rem] mx-auto px-8 md:px-16 lg:px-24">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#home" onClick={(e) => scrollToSection(e, '#home')}>
              <motion.div
                className="font-heading text-2xl md:text-3xl font-bold"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <span className={`${isScrolled ? 'text-primary' : 'text-primary-foreground'}`}>
                  Aroma
                </span>
                <span className={`${isScrolled ? 'text-accent-gold' : 'text-accent-gold'}`}>
                  {' '}Coffee
                </span>
              </motion.div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`font-paragraph text-base font-medium transition-colors duration-300 hover:text-accent-gold ${
                    isScrolled ? 'text-primary' : 'text-primary-foreground'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              
              {/* Cart Icon */}
              <button
                onClick={actions.toggleCart}
                className={`relative p-2 transition-colors duration-300 hover:text-accent-gold ${
                  isScrolled ? 'text-primary' : 'text-primary-foreground'
                }`}
              >
                <ShoppingCart className="w-6 h-6" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent-gold text-accent-gold-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>
            </nav>

            {/* Mobile Menu Button & Cart */}
            <div className="flex items-center gap-4 lg:hidden">
              <button
                onClick={actions.toggleCart}
                className={`relative p-2 transition-colors duration-300 ${
                  isScrolled ? 'text-primary' : 'text-primary-foreground'
                }`}
              >
                <ShoppingCart className="w-6 h-6" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent-gold text-accent-gold-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>
              
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 transition-colors duration-300 ${
                  isScrolled ? 'text-primary' : 'text-primary-foreground'
                }`}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-background border-t border-primary/10"
            >
              <nav className="flex flex-col px-8 py-6 gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="font-paragraph text-base font-medium text-primary hover:text-accent-gold transition-colors duration-300 py-2"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
      
      <Cart />
    </>
  );
}
