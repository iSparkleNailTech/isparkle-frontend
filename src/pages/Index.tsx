import { useState } from "react";
import { AnimatePresence } from "framer-motion";
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

const Index = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const handleOpenBooking = () => setIsBookingOpen(true);
  const handleCloseBooking = () => setIsBookingOpen(false);

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
    </div>
  );
};

export default Index;
