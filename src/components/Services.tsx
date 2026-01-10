import { motion } from "framer-motion";
import { Sparkles, Heart, Sun, Scissors, Eye, Package } from "lucide-react";

const serviceCategories = [
  {
    icon: Sparkles,
    title: "Nails",
    description: "Acrylic, Gel Builder (BIAB), Hard Gel, Nail Polishes, Nail Art & Manicure services",
    services: [
      { name: "Acrylic Nails", price: "Varies" },
      { name: "Gel Builder (BIAB)", price: "Varies" },
      { name: "Hard Gel", price: "Varies" },
      { name: "Nail Art & Manicure", price: "Varies" },
    ],
  },
  {
    icon: Heart,
    title: "Pedicure",
    description: "Luxurious foot care treatments for ultimate relaxation",
    services: [
      { name: "Classic Pedicure", price: "Varies" },
      { name: "iSparkle Signature Pedicure with gel", price: "Premium" },
      { name: "Jelly Pedicure", price: "Premium" },
    ],
  },
  {
    icon: Sun,
    title: "Facials",
    description: "Rejuvenating facial treatments for glowing skin",
    services: [
      { name: "Deep Cleansing Facial", price: "GH₵250" },
      { name: "Hydra Facial", price: "GH₵300" },
      { name: "Dermaplaning Facial", price: "GH₵300" },
      { name: "High Frequency Facial", price: "GH₵300" },
      { name: "Brightening Facial", price: "GH₵300" },
    ],
  },
  {
    icon: Heart,
    title: "Massages",
    description: "Therapeutic massage treatments for body and mind",
    services: [
      { name: "Swedish Massage", price: "GH₵250" },
      { name: "Deep Tissue Massage", price: "GH₵300" },
      { name: "Hot Stone Massage", price: "GH₵400" },
      { name: "Back & Neck Massage", price: "GH₵150" },
    ],
  },
  {
    icon: Scissors,
    title: "Waxing",
    description: "Professional waxing services for smooth, flawless skin",
    services: [
      { name: "Eye Brow", price: "GH₵70" },
      { name: "Chin", price: "GH₵70" },
      { name: "Upper Lip", price: "GH₵50" },
      { name: "Bikini", price: "GH₵200" },
      { name: "Back", price: "GH₵400" },
      { name: "Leg", price: "GH₵250" },
    ],
  },
  {
    icon: Eye,
    title: "Mink Eyelashes",
    description: "Beautiful lash extensions to enhance your eyes",
    services: [
      { name: "Classic Lashes", price: "Varies" },
      { name: "Hybrid Lashes", price: "Varies" },
      { name: "Cat Eye Lashes", price: "Varies" },
      { name: "Volume Mink Lashes", price: "Varies" },
    ],
  },
  {
    icon: Package,
    title: "Other Services",
    description: "Additional beauty and wellness treatments",
    services: [
      { name: "Cavitation Treatment", price: "GH₵400/session" },
    ],
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 bg-black-light relative">
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
          <p className="text-cream max-w-2xl mx-auto">
            Indulge in our curated selection of beauty treatments designed to pamper and transform. Home services available!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="h-full p-8 rounded-xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-gold">
                <div className="w-14 h-14 rounded-lg bg-gradient-gold flex items-center justify-center mb-6 group-hover:shadow-gold transition-shadow">
                  <category.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                
                <h3 className="font-heading text-2xl font-semibold text-foreground mb-3">
                  {category.title}
                </h3>
                
                <p className="text-cream mb-6 leading-relaxed text-sm">
                  {category.description}
                </p>
                
                <div className="space-y-2 pt-4 border-t border-border/50">
                  {category.services.slice(0, 4).map((service) => (
                    <div key={service.name} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{service.name}</span>
                      <span className="text-primary font-semibold">{service.price}</span>
                    </div>
                  ))}
                  {category.services.length > 4 && (
                    <p className="text-muted-foreground text-xs pt-2">+ {category.services.length - 4} more services</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Products note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center p-6 rounded-xl bg-card border border-primary/30"
        >
          <Package className="w-8 h-8 text-primary mx-auto mb-3" />
          <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
            Products Available
          </h3>
          <p className="text-cream">
            We sell a wide variety of skincare, body care products as well as fashion accessories
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;