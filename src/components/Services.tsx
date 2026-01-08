import { motion } from "framer-motion";
import { Scissors, Sparkles, Heart, Sun, Palette, Crown } from "lucide-react";

const services = [
  {
    icon: Scissors,
    title: "Hair Styling",
    description: "Expert cuts, coloring, and styling tailored to your unique features.",
    price: "From $45",
    duration: "45-90 min",
  },
  {
    icon: Sparkles,
    title: "Facial Treatments",
    description: "Rejuvenating facials that leave your skin glowing and refreshed.",
    price: "From $65",
    duration: "60 min",
  },
  {
    icon: Palette,
    title: "Makeup Artistry",
    description: "Professional makeup for any occasion, from natural to glamorous.",
    price: "From $55",
    duration: "45-60 min",
  },
  {
    icon: Heart,
    title: "Nail Care",
    description: "Luxurious manicures and pedicures with premium products.",
    price: "From $35",
    duration: "30-60 min",
  },
  {
    icon: Sun,
    title: "Body Treatments",
    description: "Relaxing massages and body wraps for total rejuvenation.",
    price: "From $85",
    duration: "60-90 min",
  },
  {
    icon: Crown,
    title: "Bridal Packages",
    description: "Complete beauty packages for your special day.",
    price: "From $250",
    duration: "3-4 hours",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 bg-charcoal-light relative">
      {/* Background accent */}
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
            Our Expertise
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-foreground mb-4">
            Premium Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Indulge in our curated selection of beauty treatments designed to pamper and transform.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="h-full p-8 rounded-xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-gold">
                <div className="w-14 h-14 rounded-lg bg-gradient-gold flex items-center justify-center mb-6 group-hover:shadow-gold transition-shadow">
                  <service.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                
                <h3 className="font-heading text-2xl font-semibold text-foreground mb-3">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <span className="text-primary font-semibold">{service.price}</span>
                  <span className="text-muted-foreground text-sm">{service.duration}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
