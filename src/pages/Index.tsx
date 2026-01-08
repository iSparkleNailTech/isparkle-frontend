import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BookingForm from "@/components/BookingForm";

const Index = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleOpenBooking = () => setIsBookingOpen(true);
  const handleCloseBooking = () => setIsBookingOpen(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar onBookNow={handleOpenBooking} />
      <main>
        <Hero onBookNow={handleOpenBooking} />
        <Services />
        <Contact />
      </main>
      <Footer />

      <AnimatePresence>
        {isBookingOpen && (
          <BookingForm isOpen={isBookingOpen} onClose={handleCloseBooking} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
