import { motion } from "framer-motion";
import { ChevronRight, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { ServiceCategory, ServiceItem } from "@/data/services";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
  // Show category accordion
  if (categories && onSelectCategory) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        className="p-4"
      >
        <Accordion type="single" collapsible className="space-y-2">
          {categories.map((category) => (
            <AccordionItem
              key={category.title}
              value={category.title}
              className="border border-border/50 rounded-lg overflow-hidden bg-secondary/30"
            >
              <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-secondary/50 transition-colors">
                <span className="text-sm font-medium text-foreground uppercase tracking-wide">
                  {category.title}
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-2 pb-2">
                <div className="space-y-2">
                  {category.services.map((service) => (
                    <button
                      key={service.name}
                      onClick={() => {
                        onSelectCategory(category);
                      }}
                      className="w-full p-4 rounded-lg bg-card border border-border/50 hover:border-primary/50 transition-all text-left group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground mb-1">
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
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
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
        className="p-4 space-y-2"
      >
        {selectedCategory.services.map((service) => (
          <button
            key={service.name}
            onClick={() => onSelectService(service)}
            className="w-full p-4 rounded-lg bg-card border border-border/50 hover:border-primary/50 transition-all text-left group"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-foreground mb-1">
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
