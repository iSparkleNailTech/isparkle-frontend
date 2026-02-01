import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import Services from "@/components/Services";
import GallerySection from "@/components/GallerySection";
import BookingCalendar from "@/components/BookingCalendar";
import ReviewsSection from "@/components/ReviewsSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BookingModal from "@/components/booking/BookingModal";
import { PENDING_BOOKING_KEY } from "@/components/booking/AuthStep";
import { supabase } from "@/integrations/supabase/client";
import { api } from "@/integrations/backend/api";
import { toast } from "sonner";

const Index = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isProcessingPendingBooking, setIsProcessingPendingBooking] = useState(false);

  const handleOpenBooking = () => setIsBookingOpen(true);
  const handleCloseBooking = () => setIsBookingOpen(false);

  // Process pending booking from OAuth redirect
  useEffect(() => {
    const processPendingBooking = async () => {
      const pendingBookingStr = localStorage.getItem(PENDING_BOOKING_KEY);
      if (!pendingBookingStr) return;

      // Check if user is authenticated
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        // User not authenticated yet, clear invalid pending booking
        localStorage.removeItem(PENDING_BOOKING_KEY);
        return;
      }

      // Show loading state
      setIsProcessingPendingBooking(true);

      try {
        const pendingBooking = JSON.parse(pendingBookingStr);

        // Validate required fields
        if (
          !pendingBooking.serviceCategoryId ||
          !pendingBooking.packageId ||
          !pendingBooking.date ||
          !pendingBooking.timeSlot
        ) {
          throw new Error("Invalid booking data");
        }

        // Convert date string back to Date and build start time
        const bookingDate = new Date(pendingBooking.date);
        const [hours, minutes] = pendingBooking.timeSlot.split(":").map(Number);
        const startTime = new Date(bookingDate);
        startTime.setHours(hours, minutes, 0, 0);

        // Generate idempotency key
        const idempotencyKey = `${Date.now()}-${Math.random().toString(36).substring(7)}`;

        // Submit the booking
        await api.createBooking({
          serviceCategoryId: pendingBooking.serviceCategoryId,
          packageId: pendingBooking.packageId,
          startTime: startTime.toISOString(),
          idempotencyKey,
        });

        toast.success("Booking Confirmed!", {
          description: `Your ${pendingBooking.packageName || "appointment"} is scheduled for ${bookingDate.toLocaleDateString()} at ${pendingBooking.timeSlot}.`,
        });
      } catch (error) {
        console.error("Failed to process pending booking:", error);
        toast.error("Booking Failed", {
          description: error instanceof Error ? error.message : "Failed to complete your booking. Please try again.",
        });
      } finally {
        // Always clear the pending booking and loading state
        localStorage.removeItem(PENDING_BOOKING_KEY);
        setIsProcessingPendingBooking(false);
      }
    };

    processPendingBooking();
  }, []);

  const handleNavigate = (section: string) => {
    setActiveSection(section);
    if (section === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (section === "booking") {
      document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
    } else {
      document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        onBookNow={handleOpenBooking}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />
      <main>
        <Hero onBookNow={handleOpenBooking} />
        <AboutSection />
        <Services />
        <GallerySection />
        <BookingCalendar onBookNow={handleOpenBooking} />
        <ReviewsSection />
        <Contact />
      </main>
      <Footer />

      <AnimatePresence>
        {isBookingOpen && (
          <BookingModal isOpen={isBookingOpen} onClose={handleCloseBooking} />
        )}
      </AnimatePresence>

      {/* Loading overlay for processing pending booking */}
      <AnimatePresence>
        {isProcessingPendingBooking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="flex flex-col items-center gap-4 p-8 rounded-2xl bg-card border border-border shadow-gold-lg"
            >
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
              <p className="font-body text-lg text-foreground">Confirming your booking...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
