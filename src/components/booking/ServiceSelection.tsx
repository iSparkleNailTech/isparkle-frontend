import { motion } from "framer-motion";
import { ChevronRight, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/integrations/backend/api";
import type { ServiceCategoryResponse, PackageResponse } from "@/types/booking";

interface ServiceSelectionProps {
  categories?: ServiceCategoryResponse[];
  selectedCategoryId?: string;
  onSelectCategory?: (category: ServiceCategoryResponse) => void;
  onSelectPackage?: (pkg: PackageResponse, serviceCategoryId: string) => void;
}

const ServiceSelection = ({
  categories,
  selectedCategoryId,
  onSelectCategory,
  onSelectPackage,
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
            key={category._id}
            onClick={() => onSelectCategory(category)}
            className="w-full p-4 rounded-lg bg-card border border-border/50 hover:border-primary/50 transition-all text-left group"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="font-body font-medium text-foreground">
                  {category.name}
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Click to view packages
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </button>
        ))}
      </motion.div>
    );
  }

  // Show packages for selected category
  if (selectedCategoryId && onSelectPackage) {
    const { data, isLoading, error } = useQuery({
      queryKey: ["packages", selectedCategoryId],
      queryFn: () => api.getPackages(selectedCategoryId),
    });

    if (isLoading) {
      return (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="p-4 flex items-center justify-center py-12"
        >
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </motion.div>
      );
    }

    if (error) {
      return (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="p-4 text-center py-12"
        >
          <p className="text-muted-foreground">Unable to load packages. Please try again.</p>
        </motion.div>
      );
    }

    const packages = data?.packages || [];

    if (packages.length === 0) {
      return (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="p-4 text-center py-12"
        >
          <p className="text-muted-foreground">No packages available for this service.</p>
        </motion.div>
      );
    }

    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        className="p-4 space-y-2 font-body"
      >
        {packages.map((pkg) => {
          const duration = pkg.durationMinutes
            ? `${pkg.durationMinutes} mins`
            : "Standard duration";
          const price = `GH₵${(pkg.price / 100).toFixed(2)}`;

          return (
            <button
              key={pkg._id}
              onClick={() => onSelectPackage(pkg, selectedCategoryId)}
              className="w-full p-4 rounded-lg bg-card border border-border/50 hover:border-primary/50 transition-all text-left group"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-body font-medium text-foreground mb-1">
                    {pkg.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {duration} · <span className="font-semibold text-foreground">{price}</span>
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </button>
          );
        })}
      </motion.div>
    );
  }

  return null;
};

export default ServiceSelection;
