import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft } from "lucide-react";
import { serviceCategories, ServiceCategory, ServiceItem } from "@/data/services";
import ServiceSelection from "./ServiceSelection";
import DateTimeSelection from "./DateTimeSelection";
import AuthStep from "./AuthStep";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { toast } from "sonner";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export type BookingStep = "service" | "subservice" | "datetime" | "auth";

export interface BookingState {
  category: ServiceCategory | null;
  service: ServiceItem | null;
  date: Date | null;
  timeSlot: string | null;
}

const BookingModal = ({ isOpen, onClose }: BookingModalProps) => {
  const [step, setStep] = useState<BookingStep>("service");
  const [booking, setBooking] = useState<BookingState>({
    category: null,
    service: null,
    date: null,
    timeSlot: null,
  });
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSelectCategory = (category: ServiceCategory) => {
    setBooking((prev) => ({ ...prev, category }));
    setStep("subservice");
  };

  const handleSelectService = (service: ServiceItem) => {
    setBooking((prev) => ({ ...prev, service }));
    setStep("datetime");
  };

  const handleSelectDateTime = (date: Date, timeSlot: string) => {
    setBooking((prev) => ({ ...prev, date, timeSlot }));
    if (user) {
      handleConfirmBooking();
    } else {
      setStep("auth");
    }
  };

  const handleAuthSuccess = () => {
    handleConfirmBooking();
  };

  const handleConfirmBooking = () => {
    toast.success("Booking Confirmed!", {
      description: `Your ${booking.service?.name} appointment is scheduled for ${booking.date?.toLocaleDateString()} at ${booking.timeSlot}.`,
    });
    handleClose();
  };

  const handleBack = () => {
    switch (step) {
      case "subservice":
        setStep("service");
        setBooking((prev) => ({ ...prev, category: null }));
        break;
      case "datetime":
        setStep("subservice");
        setBooking((prev) => ({ ...prev, service: null }));
        break;
      case "auth":
        setStep("datetime");
        setBooking((prev) => ({ ...prev, date: null, timeSlot: null }));
        break;
    }
  };

  const handleClose = () => {
    setStep("service");
    setBooking({ category: null, service: null, date: null, timeSlot: null });
    onClose();
  };

  const getStepTitle = () => {
    switch (step) {
      case "service":
        return "Services";
      case "subservice":
        return booking.category?.title || "Select Service";
      case "datetime":
        return "Select a time";
      case "auth":
        return "Your details";
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
      onClick={handleClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="relative w-full max-w-2xl bg-card border border-border rounded-2xl shadow-gold-lg overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/50">
          <div className="flex items-center gap-3">
            {step !== "service" && (
              <button
                onClick={handleBack}
                className="p-1 rounded-full hover:bg-secondary transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-foreground" />
              </button>
            )}
            <h2 className="font-heading text-lg font-semibold text-foreground">
              {getStepTitle()}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-secondary transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            {step === "service" && (
              <ServiceSelection
                key="service"
                categories={serviceCategories}
                onSelectCategory={handleSelectCategory}
              />
            )}
            {step === "subservice" && booking.category && (
              <ServiceSelection
                key="subservice"
                selectedCategory={booking.category}
                onSelectService={handleSelectService}
              />
            )}
            {step === "datetime" && booking.service && (
              <DateTimeSelection
                key="datetime"
                service={booking.service}
                onSelectDateTime={handleSelectDateTime}
              />
            )}
            {step === "auth" && (
              <AuthStep key="auth" onSuccess={handleAuthSuccess} />
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BookingModal;
