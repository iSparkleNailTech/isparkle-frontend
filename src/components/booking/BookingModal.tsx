import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import ServiceSelection from "./ServiceSelection";
import DateTimeSelection from "./DateTimeSelection";
import AuthStep from "./AuthStep";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { toast } from "sonner";
import { api } from "@/integrations/backend/api";
import type { ServiceCategoryResponse, PackageResponse } from "@/types/booking";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export type BookingStep = "service" | "subservice" | "datetime" | "auth";

export interface BookingState {
  serviceCategoryId: string | null;
  serviceCategoryName: string | null;
  packageId: string | null;
  packageName: string | null;
  date: Date | null;
  timeSlot: string | null;
  customerName: string | null;
  customerEmail: string | null;
  customerPhone: string | null;
}

const BookingModal = ({ isOpen, onClose }: BookingModalProps) => {
  const [step, setStep] = useState<BookingStep>("service");
  const [booking, setBooking] = useState<BookingState>({
    serviceCategoryId: null,
    serviceCategoryName: null,
    packageId: null,
    packageName: null,
    date: null,
    timeSlot: null,
    customerName: null,
    customerEmail: null,
    customerPhone: null,
  });
  const [user, setUser] = useState<User | null>(null);

  const { data: servicesData } = useQuery({
    queryKey: ["services"],
    queryFn: () => api.getServices(),
    enabled: isOpen,
  });

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSelectCategory = (category: ServiceCategoryResponse) => {
    setBooking((prev) => ({
      ...prev,
      serviceCategoryId: category._id,
      serviceCategoryName: category.name,
    }));
    setStep("subservice");
  };

  const handleSelectPackage = (pkg: PackageResponse, serviceCategoryId: string) => {
    setBooking((prev) => ({
      ...prev,
      packageId: pkg._id,
      packageName: pkg.name,
    }));
    setStep("datetime");
  };

  const handleSelectDateTime = (date: Date, timeSlot: string) => {
    setBooking((prev) => ({ ...prev, date, timeSlot }));
    setStep("auth");
  };

  const handleAuthSuccess = (
    name: string,
    email: string,
    phone: string
  ) => {
    setBooking((prev) => ({
      ...prev,
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
    }));
    handleConfirmBooking();
  };

  const handleConfirmBooking = async () => {
    if (
      !booking.serviceCategoryId ||
      !booking.packageId ||
      !booking.date ||
      !booking.timeSlot ||
      !booking.customerName ||
      !booking.customerEmail ||
      !booking.customerPhone
    ) {
      toast.error("Missing booking information");
      return;
    }

    try {
      // Combine date and time slot into ISO datetime
      const [hours, minutes] = booking.timeSlot.split(":").map(Number);
      const startTime = new Date(booking.date);
      startTime.setHours(hours, minutes, 0, 0);

      // Generate idempotency key
      const idempotencyKey = `${Date.now()}-${Math.random().toString(36).substring(7)}`;

      await api.createBooking({
        serviceCategoryId: booking.serviceCategoryId,
        packageId: booking.packageId,
        customerName: booking.customerName,
        customerEmail: booking.customerEmail,
        customerPhone: booking.customerPhone,
        startTime: startTime.toISOString(),
        idempotencyKey,
      });

      toast.success("Booking Confirmed!", {
        description: `Your ${booking.packageName} appointment is scheduled for ${booking.date?.toLocaleDateString()} at ${booking.timeSlot}.`,
      });
      handleClose();
    } catch (error: any) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to create booking";
      toast.error("Booking Failed", {
        description: errorMessage,
      });
    }
  };

  const handleBack = () => {
    switch (step) {
      case "subservice":
        setStep("service");
        setBooking((prev) => ({
          ...prev,
          serviceCategoryId: null,
          serviceCategoryName: null,
        }));
        break;
      case "datetime":
        setStep("subservice");
        setBooking((prev) => ({
          ...prev,
          packageId: null,
          packageName: null,
        }));
        break;
      case "auth":
        setStep("datetime");
        setBooking((prev) => ({
          ...prev,
          date: null,
          timeSlot: null,
        }));
        break;
    }
  };

  const handleClose = () => {
    setStep("service");
    setBooking({
      serviceCategoryId: null,
      serviceCategoryName: null,
      packageId: null,
      packageName: null,
      date: null,
      timeSlot: null,
      customerName: null,
      customerEmail: null,
      customerPhone: null,
    });
    onClose();
  };

  const getStepTitle = () => {
    switch (step) {
      case "service":
        return "Services";
      case "subservice":
        return booking.serviceCategoryName || "Select Package";
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
            <h2 className="font-body text-lg font-semibold text-foreground">
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
                categories={servicesData?.services}
                onSelectCategory={handleSelectCategory}
              />
            )}
            {step === "subservice" && booking.serviceCategoryId && (
              <ServiceSelection
                key="subservice"
                selectedCategoryId={booking.serviceCategoryId}
                onSelectPackage={handleSelectPackage}
              />
            )}
            {step === "datetime" && booking.packageId && booking.serviceCategoryId && (
              <DateTimeSelection
                key="datetime"
                packageId={booking.packageId}
                serviceCategoryId={booking.serviceCategoryId}
                packageName={booking.packageName || ""}
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
