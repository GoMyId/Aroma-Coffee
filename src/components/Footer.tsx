import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-[100rem] mx-auto px-8 md:px-16 lg:px-24 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div>
            <h3 className="font-heading text-3xl font-bold mb-4">
              Aroma <span className="text-accent-gold">Coffee</span>
            </h3>
            <p className="font-paragraph text-sm text-primary-foreground/80 leading-relaxed mb-6">
              Experience the perfect blend of quality, craftsmanship, and comfort in every cup. Your daily dose of excellence.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary-foreground/10 p-3 rounded-full hover:bg-accent-gold transition-colors duration-300"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary-foreground/10 p-3 rounded-full hover:bg-accent-gold transition-colors duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary-foreground/10 p-3 rounded-full hover:bg-accent-gold transition-colors duration-300"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-xl font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#home"
                  onClick={(e) => scrollToSection(e, '#home')}
                  className="font-paragraph text-sm text-primary-foreground/80 hover:text-accent-gold transition-colors duration-300"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => scrollToSection(e, '#about')}
                  className="font-paragraph text-sm text-primary-foreground/80 hover:text-accent-gold transition-colors duration-300"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#menu"
                  onClick={(e) => scrollToSection(e, '#menu')}
                  className="font-paragraph text-sm text-primary-foreground/80 hover:text-accent-gold transition-colors duration-300"
                >
                  Menu
                </a>
              </li>
              <li>
                <a
                  href="#products"
                  onClick={(e) => scrollToSection(e, '#products')}
                  className="font-paragraph text-sm text-primary-foreground/80 hover:text-accent-gold transition-colors duration-300"
                >
                  Products
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  onClick={(e) => scrollToSection(e, '#gallery')}
                  className="font-paragraph text-sm text-primary-foreground/80 hover:text-accent-gold transition-colors duration-300"
                >
                  Gallery
                </a>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="font-heading text-xl font-semibold mb-6">Opening Hours</h4>
            <ul className="space-y-3 font-paragraph text-sm text-primary-foreground/80">
              <li className="flex justify-between">
                <span>Monday - Friday</span>
                <span className="font-semibold">7am - 8pm</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span className="font-semibold">8am - 9pm</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span className="font-semibold">8am - 9pm</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading text-xl font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent-gold flex-shrink-0 mt-1" />
                <span className="font-paragraph text-sm text-primary-foreground/80">
                  Bole Road<br />
                  Addis Ababa<br />
                  Ethiopia
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent-gold flex-shrink-0" />
                <span className="font-paragraph text-sm text-primary-foreground/80">
                  +251948039190
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent-gold flex-shrink-0" />
                <span className="font-paragraph text-sm text-primary-foreground/80">
                  hello@aromacoffee.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-paragraph text-sm text-primary-foreground/60 text-center md:text-left">
              © {currentYear} Aroma Coffee. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="font-paragraph text-sm text-primary-foreground/60 hover:text-accent-gold transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="font-paragraph text-sm text-primary-foreground/60 hover:text-accent-gold transition-colors duration-300"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
