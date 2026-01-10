import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, User, Mail, Phone, Sparkles, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface BookingFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const services = [
  "Nails - Acrylic/Gel/BIAB",
  "Classic Pedicure",
  "iSparkle Signature Pedicure",
  "Jelly Pedicure",
  "Deep Cleansing Facial",
  "Hydra Facial",
  "Dermaplaning Facial",
  "Swedish Massage",
  "Deep Tissue Massage",
  "Hot Stone Massage",
  "Back & Neck Massage",
  "Waxing Services",
  "Mink Eyelashes",
  "Cavitation Treatment",
];

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM",
];

const BookingForm = ({ isOpen, onClose }: BookingFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    time: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast.success("Booking Confirmed!", {
      description: `Your ${formData.service} appointment is scheduled for ${formData.date} at ${formData.time}. We'll send a confirmation to ${formData.email}.`,
      icon: <Check className="w-5 h-5 text-primary" />,
    });

    setFormData({ name: "", email: "", phone: "", service: "", date: "", time: "" });
    setIsSubmitting(false);
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  // Calculate minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="relative w-full max-w-lg p-8 bg-card border border-border rounded-2xl shadow-gold-lg overflow-y-auto max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-secondary transition-colors"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-6 h-6 text-primary-foreground" />
          </div>
          <h2 className="font-heading text-3xl font-semibold text-foreground">
            Book Your Visit
          </h2>
          <p className="text-muted-foreground mt-2">
            Schedule your personalized beauty experience
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground flex items-center gap-2">
              <User className="w-4 h-4 text-primary" />
              Full Name
            </Label>
            <Input
              id="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={e => handleInputChange("name", e.target.value)}
              required
              className="bg-secondary text-secondary-foreground placeholder:text-secondary-foreground/50 border-border focus:border-primary"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={e => handleInputChange("email", e.target.value)}
                required
                className="bg-secondary text-secondary-foreground placeholder:text-secondary-foreground/50 border-border focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-foreground flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                Phone
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(555) 123-4567"
                value={formData.phone}
                onChange={e => handleInputChange("phone", e.target.value)}
                required
                className="bg-secondary text-secondary-foreground placeholder:text-secondary-foreground/50 border-border focus:border-primary"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-foreground flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              Service
            </Label>
            <Select
              value={formData.service}
              onValueChange={value => handleInputChange("service", value)}
              required
            >
              <SelectTrigger className="bg-secondary text-secondary-foreground border-border focus:border-primary">
                <SelectValue placeholder="Select a service" className="placeholder:text-secondary-foreground/50" />
              </SelectTrigger>
              <SelectContent>
                {services.map(service => (
                  <SelectItem key={service} value={service}>
                    {service}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="text-foreground flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                Date
              </Label>
              <Input
                id="date"
                type="date"
                min={today}
                value={formData.date}
                onChange={e => handleInputChange("date", e.target.value)}
                required
                className="bg-secondary text-secondary-foreground border-border focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-foreground flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                Time
              </Label>
              <Select
                value={formData.time}
                onValueChange={value => handleInputChange("time", value)}
                required
              >
                <SelectTrigger className="bg-secondary text-secondary-foreground border-border focus:border-primary">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map(time => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            type="submit"
            variant="gold"
            size="lg"
            className="w-full mt-6"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-5 h-5" />
                </motion.span>
                Confirming...
              </span>
            ) : (
              <>
                <Check className="w-5 h-5" />
                Confirm Booking
              </>
            )}
          </Button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default BookingForm;
