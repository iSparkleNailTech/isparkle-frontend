import { motion } from "framer-motion";
import { Package } from "lucide-react";
import { serviceCategories } from "@/data/services";

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
                
                <div className="space-y-3 pt-4 border-t border-border/50">
                  {category.services.slice(0, 4).map((service) => (
                    <div key={service.name} className="flex items-center justify-between text-sm">
                      <div className="flex flex-col">
                        <span className="text-muted-foreground">{service.name}</span>
                        <span className="text-xs text-muted-foreground/70">{service.duration}</span>
                      </div>
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
