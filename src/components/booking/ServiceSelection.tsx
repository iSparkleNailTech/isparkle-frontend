import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { ServiceCategory, ServiceItem } from "@/data/services";

interface ServiceSelectionProps {
  categories?: ServiceCategory[];
  selectedCategory?: ServiceCategory;
  onSelectCategory?: (category: ServiceCategory) => void;
  onSelectService?: (service: ServiceItem) => void;
}

const ServiceSelection = ({
  categories,
  selectedCategory,
  onSelectCategory,
  onSelectService,
}: ServiceSelectionProps) => {
  // Show category list as cards
  if (categories && onSelectCategory) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        className="p-4 space-y-2 font-body"
      >
        {categories.map((category) => (
          <button
            key={category.title}
            onClick={() => onSelectCategory(category)}
            className="w-full p-4 rounded-lg bg-card border border-border/50 hover:border-primary/50 transition-all text-left group"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="font-body font-medium text-foreground">
                  {category.title}
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {category.services.length} services available
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </button>
        ))}
      </motion.div>
    );
  }

  // Show sub-services for selected category
  if (selectedCategory && onSelectService) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        className="p-4 space-y-2 font-body"
      >
        {selectedCategory.services.map((service) => (
          <button
            key={service.name}
            onClick={() => onSelectService(service)}
            className="w-full p-4 rounded-lg bg-card border border-border/50 hover:border-primary/50 transition-all text-left group"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="font-body font-medium text-foreground mb-1">
                  {service.name}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {service.duration} · <span className="font-semibold text-foreground">{service.price}</span>
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </button>
        ))}
      </motion.div>
    );
  }

  return null;
};

export default ServiceSelection;
