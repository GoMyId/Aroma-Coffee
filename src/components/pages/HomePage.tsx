// HPI 1.7-G
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import GallerySection from '@/components/GallerySection';
import Header from '@/components/Header';
import MenuSection from '@/components/MenuSection';
import ProductCarousel from '@/components/ProductCarousel';
import TestimonialsSection from '@/components/TestimonialsSection';
import { Image } from '@/components/ui/image';
import type { CoffeeMenu, CoffeeProducts, ShopGallery, Testimonials } from '@/entities';
import { BaseCrudService } from '@/integrations';
import { AnimatePresence, motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown, Mail, MapPin, Phone } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

// --- Utility Components for Animation & Layout ---

const FadeIn = ({ children, delay = 0, className = "", direction = "up" }: { children: React.ReactNode, delay?: number, className?: string, direction?: "up" | "down" | "left" | "right" | "none" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
    none: { x: 0, y: 0 }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...directions[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...directions[direction] }}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Hairline = ({ className = "" }: { className?: string }) => (
  <div className={`h-[1px] w-full bg-primary/15 ${className}`} />
);

const SectionNumber = ({ number, title }: { number: string, title: string }) => (
  <div className="flex items-center gap-6 mb-12">
    <span className="font-heading text-sm tracking-[0.2em] text-accent-gold">{number}</span>
    <div className="h-[1px] w-12 bg-accent-gold/50" />
    <span className="font-paragraph text-xs uppercase tracking-[0.15em] text-primary/60">{title}</span>
  </div>
);

// --- Main Page Component ---

export default function HomePage() {
  // Canonical Data Sources
  const [products, setProducts] = useState<CoffeeProducts[]>([]);
  const [menuItems, setMenuItems] = useState<CoffeeMenu[]>([]);
  const [galleryImages, setGalleryImages] = useState<ShopGallery[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonials[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Scroll & Parallax Setup
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], [0, 400]);
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  const breatherY = useTransform(scrollY, [0, 3000], [0, -200]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [productsResult, menuResult, galleryResult, testimonialsResult] = await Promise.all([
        BaseCrudService.getAll<CoffeeProducts>('coffeeproducts'),
        BaseCrudService.getAll<CoffeeMenu>('coffeemenu'),
        BaseCrudService.getAll<ShopGallery>('shopgallery'),
        BaseCrudService.getAll<Testimonials>('testimonials')
      ]);

      setProducts(productsResult.items);
      setMenuItems(menuResult.items);
      setGalleryImages(galleryResult.items);
      setTestimonials(testimonialsResult.items);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent-gold/30 selection:text-primary overflow-clip">
      <style>
        {`
          .text-balance { text-wrap: balance; }
          .grain-overlay {
            position: absolute;
            inset: 0;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
            opacity: 0.03;
            pointer-events: none;
            z-index: 50;
          }
          .clip-diagonal {
            clip-path: polygon(0 0, 100% 0, 100% 95%, 0 100%);
          }
        `}
      </style>

      <div className="grain-overlay" />
      <Header />

      {/* 1. HERO SECTION - Cinematic Parallax */}
      <section id="home" className="relative w-full h-[100svh] flex items-center justify-center overflow-hidden bg-primary">
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <Image
            src="https://static.wixstatic.com/media/c25388_77031b7418a74411a90c9f719736d58b~mv2.png?originWidth=1920&originHeight=1024"
            alt="Freshly brewed coffee background"
            className="w-full h-[120%] object-cover object-center scale-105"
            width={1920}
          />
          <div className="absolute inset-0 bg-primary/40 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-transparent to-background" />
        </motion.div>

        <div className="relative z-10 w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24 flex flex-col items-center text-center mt-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <span className="font-paragraph text-xs md:text-sm uppercase tracking-[0.3em] text-accent-gold mb-8 block">
              Est. 2024 • The Refined Brew
            </span>
            <h1 className="font-heading text-6xl md:text-8xl lg:text-[9rem] leading-[0.9] text-primary-foreground mb-8 tracking-tight text-balance drop-shadow-sm">
              The Art of <br className="hidden md:block" />
              <span className="italic font-light text-secondary/90">Quiet Luxury</span>
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-secondary/80 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
              Experience the perfect blend of meticulous craftsmanship and sophisticated comfort in every cup.
            </p>

            <a href="#products" className="group relative inline-flex items-center justify-center px-10 py-4 overflow-hidden rounded-full bg-transparent border border-accent-gold/50 text-accent-gold transition-all duration-500 hover:border-accent-gold hover:bg-accent-gold hover:text-primary-foreground">
              <span className="font-paragraph text-sm uppercase tracking-widest font-medium relative z-10 flex items-center gap-3">
                Explore Collection
                <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
              </span>
            </a>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <span className="font-paragraph text-[10px] uppercase tracking-[0.2em] text-secondary/50">Scroll to discover</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4 text-secondary/50" />
          </motion.div>
        </motion.div>
      </section>

      {/* 2. ABOUT SECTION - Editorial Sticky Layout */}
      <section id="about" className="relative bg-background z-20">
        <div className="max-w-[120rem] mx-auto">
          <div className="flex flex-col lg:flex-row">
            {/* Sticky Image Column */}
            <div className="lg:w-1/2 relative h-[60vh] lg:h-screen lg:sticky lg:top-0 overflow-hidden">
              <div className="absolute inset-0 bg-primary/5 z-10" />
              <Image
                src="https://static.wixstatic.com/media/c25388_b3ad7d153f074b3fb8d014318c9360e2~mv2.png?originWidth=1152&originHeight=1024"
                alt="Barista crafting coffee"
                className="w-full h-full object-cover"
                width={1200}
              />
            </div>

            {/* Scrolling Content Column */}
            <div className="lg:w-1/2 px-8 py-24 md:px-16 lg:px-24 lg:py-48 flex flex-col justify-center bg-background">
              <SectionNumber number="01" title="Our Heritage" />

              <FadeIn>
                <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl text-primary mb-12 leading-tight text-balance">
                  A dedication to the <span className="italic text-muted-brown">perfect pour.</span>
                </h2>
              </FadeIn>

              <div className="space-y-8 font-paragraph text-lg text-primary/70 leading-relaxed font-light max-w-xl">
                <FadeIn delay={0.1}>
                  <p>
                    <span className="text-5xl font-heading text-primary float-left mr-4 mt-2 leading-none">A</span>
                     Aroma Coffee እያንዳንዱ የቡና ጽዋ አንድ ታሪክ እንደሚናገር እናምናለን። ከተመሠረተን ጀምሮ ከዓለም ዙሪያ ያሉ ከፍተኛ ጥራት ያላቸውን የቡና ፍሬዎች በመምረጥ እና በትንሽ በጥንቃቄ በሚደረጉ የመጥበስ ሂደቶች ወደ ፍጹምነት ለማድረስ እንተጋለን።.
                  </p>
                </FadeIn>
                <FadeIn delay={0.2}>
                  <p>
                    Our passion for coffee goes beyond the brew. We've created a space where community meets craftsmanship, where every visit is an experience of quiet luxury and sophisticated comfort.
                  </p>
                </FadeIn>
                <FadeIn delay={0.3}>
                  <p>
                    From our carefully trained baristas to our thoughtfully designed space, every detail reflects our commitment to excellence and our love for the art of coffee.
                  </p>
                </FadeIn>
              </div>

              <FadeIn delay={0.4} className="mt-16">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden border border-primary/10">
                    <Image
                      src="https://static.wixstatic.com/media/c25388_3b031c3f70bd463797351299cba4383~mv2.png?originWidth=1152&originHeight=1024"
                      alt="Master Roaster Signature"
                      className="w-full h-full object-cover grayscale"
                    />
                  </div>
                  <div>
                    <p className="font-heading text-xl text-primary">Solomon Haile</p>
                    <p className="font-paragraph text-sm text-primary/50 uppercase tracking-widest">Master Roaster</p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PRODUCTS SECTION - The Collection */}
      <section id="products" className="py-32 md:py-48 bg-secondary relative z-20">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <SectionNumber number="02" title="The Collection" />
              <FadeIn>
                <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl text-primary leading-tight">
                  Curated <span className="italic text-muted-brown">Excellence</span>
                </h2>
              </FadeIn>
            </div>
            <FadeIn delay={0.2} className="md:text-right max-w-md">
              <p className="font-paragraph text-base text-primary/60 leading-relaxed font-light">
                Discover our carefully curated collection of premium coffee products, sourced from the world's finest coffee regions and roasted to highlight their unique profiles.
              </p>
            </FadeIn>
          </div>

          <Hairline className="mb-16" />

          <div className="min-h-[600px] relative">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-12 h-12 border-t-2 border-accent-gold rounded-full animate-spin" />
                </motion.div>
              ) : products.length > 0 ? (
                <motion.div
                  key="content"
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
                >
                  <ProductCarousel products={products} />
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="text-center py-32 border border-primary/10 rounded-2xl bg-background/50"
                >
                  <p className="font-paragraph text-lg text-primary/40 uppercase tracking-widest">Collection updating</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 4. MENU SECTION - The Craft */}
      <section id="menu" className="py-32 md:py-48 bg-background relative z-20">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12 lg:px-24">
          <div className="text-center mb-24 flex flex-col items-center">
            <SectionNumber number="03" title="The Craft" />
            <FadeIn>
              <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl text-primary mb-8">
                Our <span className="italic text-muted-brown">Menu</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="font-paragraph text-lg text-primary/60 max-w-2xl mx-auto leading-relaxed font-light">
                Explore our diverse menu of handcrafted beverages, each prepared with precision, care, and a deep respect for the ingredients.
              </p>
            </FadeIn>
          </div>

          <div className="min-h-[400px] relative">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading-menu"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-12 h-12 border-t-2 border-accent-gold rounded-full animate-spin" />
                </motion.div>
              ) : menuItems.length > 0 ? (
                <motion.div
                  key="content-menu"
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
                >
                  <MenuSection menuItems={menuItems} />
                </motion.div>
              ) : (
                <motion.div
                  key="empty-menu"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="text-center py-20"
                >
                  <p className="font-paragraph text-lg text-primary/40 uppercase tracking-widest">Menu coming soon</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 5. VISUAL BREATHER - Parallax Atmosphere */}
      <section className="relative h-[80vh] w-full overflow-hidden z-10">
        <motion.div
          className="absolute inset-0 w-full h-[130%]"
          style={{ y: breatherY }}
        >
          <Image
            src="https://static.wixstatic.com/media/c25388_926cc055878a4687ba222f2a74caafda~mv2.png?originWidth=1280&originHeight=704"
            alt="Coffee shop atmosphere"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/60 mix-blend-multiply" />
        </motion.div>
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <FadeIn>
            <p className="font-heading text-3xl md:text-5xl lg:text-6xl text-primary-foreground max-w-4xl leading-tight text-balance italic font-light drop-shadow-lg">
              "Coffee is a language in itself, spoken in the quiet moments of the morning."
            </p>
          </FadeIn>
        </div>
      </section>

      {/* 6. GALLERY SECTION - The Atmosphere */}
      <section id="gallery" className="py-32 md:py-48 bg-secondary relative z-20">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <SectionNumber number="04" title="Atmosphere" />
              <FadeIn>
                <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl text-primary leading-tight">
                  Spaces to <span className="italic text-muted-brown">Linger</span>
                </h2>
              </FadeIn>
            </div>
          </div>

          <div className="min-h-[500px] relative">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading-gallery"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-12 h-12 border-t-2 border-accent-gold rounded-full animate-spin" />
                </motion.div>
              ) : galleryImages.length > 0 ? (
                <motion.div
                  key="content-gallery"
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
                >
                  <GallerySection images={galleryImages} />
                </motion.div>
              ) : (
                <motion.div
                  key="empty-gallery"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="text-center py-32 border border-primary/10 rounded-2xl bg-background/50"
                >
                  <p className="font-paragraph text-lg text-primary/40 uppercase tracking-widest">Gallery updating</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS SECTION - Voices */}
      <section id="testimonials" className="py-32 md:py-48 bg-background relative z-20">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12 lg:px-24">
          <div className="text-center mb-24 flex flex-col items-center">
            <SectionNumber number="05" title="Voices" />
            <FadeIn>
              <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl text-primary mb-8">
                Words of <span className="italic text-muted-brown">Appreciation</span>
              </h2>
            </FadeIn>
          </div>

          <div className="min-h-[400px] relative">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading-testimonials"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-12 h-12 border-t-2 border-accent-gold rounded-full animate-spin" />
                </motion.div>
              ) : testimonials.length > 0 ? (
                <motion.div
                  key="content-testimonials"
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
                >
                  <TestimonialsSection testimonials={testimonials} />
                </motion.div>
              ) : (
                <motion.div
                  key="empty-testimonials"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="text-center py-20"
                >
                  <p className="font-paragraph text-lg text-primary/40 uppercase tracking-widest">Stories coming soon</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 8. CONTACT SECTION - Visit Us */}
      <section id="contact" className="py-32 md:py-48 bg-primary text-primary-foreground relative z-20 clip-diagonal">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24 pt-12">
          <div className="grid lg:grid-cols-2 gap-24 items-start">

            {/* Contact Info */}
            <div>
              <div className="flex items-center gap-6 mb-12">
                <span className="font-heading text-sm tracking-[0.2em] text-accent-gold">06</span>
                <div className="h-[1px] w-12 bg-accent-gold/50" />
                <span className="font-paragraph text-xs uppercase tracking-[0.15em] text-secondary/60">Visit Us</span>
              </div>

              <FadeIn>
                <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl mb-12 leading-tight">
                  Let's share a <span className="italic text-accent-gold">moment.</span>
                </h2>
              </FadeIn>

              <div className="space-y-12 mt-16">
                <FadeIn delay={0.1} direction="right">
                  <div className="flex items-start gap-6 group">
                    <div className="mt-1">
                      <MapPin className="w-6 h-6 text-accent-gold transition-transform duration-500 group-hover:-translate-y-1" />
                    </div>
                    <div>
                      <h3 className="font-paragraph text-xs uppercase tracking-[0.2em] text-secondary/50 mb-3">Location</h3>
                      <p className="font-heading text-2xl text-secondary leading-relaxed">
                         Bole Road<br />
                         Addis Ababa<br />
                        Ethiopia
                      </p>
                    </div>
                  </div>
                </FadeIn>

                <Hairline className="bg-secondary/10" />

                <FadeIn delay={0.2} direction="right">
                  <div className="flex items-start gap-6 group">
                    <div className="mt-1">
                      <Phone className="w-6 h-6 text-accent-gold transition-transform duration-500 group-hover:-translate-y-1" />
                    </div>
                    <div>
                      <h3 className="font-paragraph text-xs uppercase tracking-[0.2em] text-secondary/50 mb-3">Reservations & Inquiries</h3>
                      <p className="font-heading text-2xl text-secondary leading-relaxed">
                        +251948039190
                      </p>
                      <p className="font-paragraph text-sm text-secondary/60 mt-2 font-light">
                        Mon - Fri: 7am - 8pm<br />
                        Sat - Sun: 8am - 9pm
                      </p>
                    </div>
                  </div>
                </FadeIn>

                <Hairline className="bg-secondary/10" />

                <FadeIn delay={0.3} direction="right">
                  <div className="flex items-start gap-6 group">
                    <div className="mt-1">
                      <Mail className="w-6 h-6 text-accent-gold transition-transform duration-500 group-hover:-translate-y-1" />
                    </div>
                    <div>
                      <h3 className="font-paragraph text-xs uppercase tracking-[0.2em] text-secondary/50 mb-3">Digital Correspondence</h3>
                      <p className="font-heading text-2xl text-secondary leading-relaxed">
                        hello@aromacoffee.com
                      </p>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>

            {/* Contact Form Wrapper */}
            <FadeIn delay={0.4} direction="left" className="lg:mt-32">
              <div className="bg-background text-primary p-10 md:p-16 rounded-sm shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-accent-gold" />
                <h3 className="font-heading text-3xl mb-8">Send a Message</h3>
                <ContactForm />
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
