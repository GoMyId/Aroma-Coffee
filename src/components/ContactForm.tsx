import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import type { ContactSubmissions } from '@/entities';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const submission: ContactSubmissions = {
        _id: crypto.randomUUID(),
        name: formData.name,
        email: formData.email,
        message: formData.message,
        submissionDate: new Date().toISOString(),
        isRead: false,
      };

      await BaseCrudService.create('contactsubmissions', submission);
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="bg-background rounded-2xl p-8 shadow-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-6">
        <div>
          <label htmlFor="name" className="block font-paragraph text-sm font-medium text-primary mb-2">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border-2 border-primary/20 bg-background text-foreground font-paragraph focus:outline-none focus:border-accent-gold transition-colors duration-300"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label htmlFor="email" className="block font-paragraph text-sm font-medium text-primary mb-2">
            Your Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border-2 border-primary/20 bg-background text-foreground font-paragraph focus:outline-none focus:border-accent-gold transition-colors duration-300"
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label htmlFor="message" className="block font-paragraph text-sm font-medium text-primary mb-2">
            Your Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-4 py-3 rounded-lg border-2 border-primary/20 bg-background text-foreground font-paragraph focus:outline-none focus:border-accent-gold transition-colors duration-300 resize-none"
            placeholder="Tell us what's on your mind..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-accent-gold text-accent-gold-foreground font-paragraph font-semibold px-8 py-4 rounded-full text-base transition-all duration-300 hover:bg-accent-gold/90 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-3"
        >
          {isSubmitting ? (
            'Sending...'
          ) : (
            <>
              Send Message
              <Send className="w-5 h-5" />
            </>
          )}
        </button>

        {submitStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-accent-gold/10 border border-accent-gold text-accent-gold-foreground px-4 py-3 rounded-lg font-paragraph text-sm text-center"
          >
            Thank you! Your message has been sent successfully.
          </motion.div>
        )}

        {submitStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded-lg font-paragraph text-sm text-center"
          >
            Oops! Something went wrong. Please try again.
          </motion.div>
        )}
      </div>
    </motion.form>
  );
}
