import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { ServiceCategory, ServiceItem } from "@/data/services";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

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
  // Show category tabs
  if (categories && onSelectCategory) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        className="p-4 font-body"
      >
        <Tabs defaultValue={categories[0]?.title} className="w-full">
          <TabsList className="flex flex-wrap h-auto gap-2 bg-transparent p-0 mb-4">
            {categories.map((category) => (
              <TabsTrigger
                key={category.title}
                value={category.title}
                className="px-4 py-2.5 text-sm font-medium uppercase tracking-wide bg-card border border-border/50 rounded-lg data-[state=active]:border-primary data-[state=active]:bg-card data-[state=active]:text-primary shadow-none transition-all"
              >
                {category.title}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {categories.map((category) => (
            <TabsContent key={category.title} value={category.title} className="mt-0">
              <div className="space-y-2">
                {category.services.map((service) => (
                  <button
                    key={service.name}
                    onClick={() => {
                      onSelectCategory(category);
                      if (onSelectService) {
                        // Immediately go to sub-service selection
                      }
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
            </TabsContent>
          ))}
        </Tabs>
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
