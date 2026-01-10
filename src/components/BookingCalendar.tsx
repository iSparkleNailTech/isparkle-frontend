import { motion } from "framer-motion";
import { Calendar, Phone, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BookingCalendarProps {
  onBookNow: () => void;
}

const BookingCalendar = ({ onBookNow }: BookingCalendarProps) => {
  return (
    <section id="booking" className="py-24 bg-black-light relative">
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
            Schedule Your Visit
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-foreground mb-4">
            Booking Calendar
          </h2>
          <p className="text-cream max-w-2xl mx-auto">
            Book your appointment with us and experience the iSparkle difference
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-8 md:p-12 rounded-2xl bg-card border border-border/50 text-center"
          >
            <Calendar className="w-16 h-16 text-primary mx-auto mb-6" />
            
            <h3 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-4">
              Ready to Book Your Appointment?
            </h3>
            
            <p className="text-cream mb-8 max-w-lg mx-auto">
              Choose your preferred method to schedule your beauty experience at iSparkle Day Spa
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" onClick={onBookNow}>
                <Sparkles className="w-5 h-5" />
                Book Online
              </Button>
              
              <Button variant="gold-outline" size="xl" asChild>
                <a href="tel:+233594687992">
                  <Phone className="w-5 h-5" />
                  Call Us
                </a>
              </Button>
            </div>
            
            <div className="mt-8 pt-8 border-t border-border/50">
              <p className="text-muted-foreground text-sm mb-4">
                Or send us a message on WhatsApp
              </p>
              <Button variant="gold-outline" size="lg" asChild>
                <a 
                  href="https://wa.me/233594687992" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp Us
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BookingCalendar;