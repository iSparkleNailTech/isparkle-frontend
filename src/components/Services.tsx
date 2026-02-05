import { motion } from "framer-motion";
import { Sparkles, Heart, Sun, Scissors, Eye, Package, EyeClosed, Sprout, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/integrations/backend/api";
import type { ServiceCategoryResponse } from "@/types/booking";

// Map service category names to icons
const getServiceIcon = (name: string) => {
  const nameLower = name.toLowerCase();
  if (nameLower.includes("nail")) return Sparkles;
  if (nameLower.includes("pedicure")) return Heart;
  if (nameLower.includes("facial")) return Sun;
  if (nameLower.includes("massage")) return Sprout;
  if (nameLower.includes("wax")) return Scissors;
  if (nameLower.includes("lash") || nameLower.includes("eyelash")) return EyeClosed;
  return Package; // Default icon
};

// Default descriptions for service categories
const getServiceDescription = (name: string): string => {
  const nameLower = name.toLowerCase();
  if (nameLower.includes("nail")) {
    return "Acrylic, Gel Builder (BIAB), Hard Gel, Nail Polishes, Nail Art & Manicure services";
  }
  if (nameLower.includes("pedicure")) {
    return "Luxurious foot care treatments for ultimate relaxation";
  }
  if (nameLower.includes("facial")) {
    return "Rejuvenating facial treatments for glowing skin";
  }
  if (nameLower.includes("massage")) {
    return "Therapeutic massage treatments for body and mind";
  }
  if (nameLower.includes("wax")) {
    return "Professional waxing services for smooth, flawless skin";
  }
  if (nameLower.includes("lash") || nameLower.includes("eyelash")) {
    return "Beautiful lash extensions to enhance your eyes";
  }
  return "Additional beauty and wellness treatments";
};

const Services = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["services"],
    queryFn: () => api.getServices(),
  });

  if (isLoading) {
    return (
      <section id="services" className="py-24 bg-black-light relative">
        <div className="container px-4">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="services" className="py-24 bg-black-light relative">
        <div className="container px-4">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Unable to load services. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  const serviceCategories = data?.services || [];

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
          <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-3">Our Expertise</p>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-foreground mb-4">Premium Services</h2>
          <p className="text-cream max-w-2xl mx-auto">
            Indulge in our curated selection of beauty treatments designed to pamper and transform. Home services
            available!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceCategories.map((category: ServiceCategoryResponse, index: number) => {
            const Icon = getServiceIcon(category.name);
            const description = getServiceDescription(category.name);
            const nameLower = category.name.toLowerCase();
            const showPrices = nameLower.includes("massage") || nameLower.includes("facial") || nameLower.includes("waxing");

            return (
              <motion.div
                key={category._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <div className="h-full p-8 rounded-xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-gold">
                  <div className="w-14 h-14 rounded-lg bg-gradient-gold flex items-center justify-center mb-6 group-hover:shadow-gold transition-shadow">
                    <Icon className="w-7 h-7 text-primary-foreground" />
                  </div>

                  <h3 className="font-heading text-2xl font-semibold text-foreground mb-3">{category.name}</h3>

                  <p className="text-cream mb-6 leading-relaxed text-sm">{description}</p>

                  <div className="space-y-2 pt-4 border-t border-border/50">
                    {category.packages && category.packages.length > 0 ? (
                      <>
                        {category.packages.slice(0, 6).map((pkg) => (
                          <div key={pkg._id} className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">{pkg.name}</span>
                            {showPrices && (
                              <span className="text-primary font-semibold">GH₵{pkg.price.toFixed(0)}</span>
                            )}
                          </div>
                        ))}
                        {category.packages.length > 6 && (
                          <p className="text-muted-foreground text-xs pt-2">
                            + {category.packages.length - 4} more {category.packages.length - 4 === 1 ? 'service' : 'services'}
                          </p>
                        )}
                      </>
                    ) : (
                      <p className="text-muted-foreground text-sm">
                        Duration: {category.defaultDurationMinutes} minutes
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
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
          <h3 className="font-heading text-xl font-semibold text-foreground mb-2">Products Available</h3>
          <p className="text-cream">
            We sell a wide variety of skincare, body care products as well as fashion accessories
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
