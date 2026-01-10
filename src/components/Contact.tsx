import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from "lucide-react";

// TikTok icon component
const TikTok = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-background relative">
      {/* Top border accent */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-3">
            Contact Us
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-foreground mb-4">
            Get In Touch
          </h2>
          <p className="text-cream max-w-2xl mx-auto">
            We'd love to welcome you to our beautiful space. Stop by for a consultation or book your next appointment.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-gold flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-1">
                  Location
                </h3>
                <p className="text-cream">
                  Tema, Ghana
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-gold flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-1">
                  Phone
                </h3>
                <p className="text-cream">
                  <a href="tel:+233594687992" className="hover:text-primary transition-colors">
                    059 468 7992
                  </a>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-gold flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-1">
                  Email
                </h3>
                <p className="text-cream">
                  <a href="mailto:Isparklesolutionsspa@gmail.com" className="hover:text-primary transition-colors">
                    Isparklesolutionsspa@gmail.com
                  </a>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-gold flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-1">
                  Hours
                </h3>
                <div className="text-cream space-y-1">
                  <p>Monday - Saturday: 9:00 AM - 7:00 PM</p>
                  <p>Sunday: By Appointment</p>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="pt-6">
              <h3 className="font-heading text-xl font-semibold text-foreground mb-4">
                Follow Us
              </h3>
              <div className="flex gap-4">
                <a
                  href="https://instagram.com/isparklesolutions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-primary/50 flex items-center justify-center hover:bg-primary hover:border-primary transition-all group"
                >
                  <Instagram className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                </a>
                <a
                  href="https://facebook.com/ISparkle"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-primary/50 flex items-center justify-center hover:bg-primary hover:border-primary transition-all group"
                >
                  <Facebook className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                </a>
                <a
                  href="https://tiktok.com/@isparkle_1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-primary/50 flex items-center justify-center hover:bg-primary hover:border-primary transition-all group"
                >
                  <TikTok className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Map - Tema, Ghana */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl overflow-hidden border border-border/50 h-[400px] lg:h-full min-h-[300px]"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127065.98614709972!2d-0.0693949!3d5.6698925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9084b2b7a773%3A0xbed14ed8650e2dd3!2sTema%2C%20Ghana!5e0!3m2!1sen!2s!4v1699000000000!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="iSparkle Day Spa Location - Tema, Ghana"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;