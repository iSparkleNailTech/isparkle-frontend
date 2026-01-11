import { Hand, Footprints, Smile, Heart, Scissors, Eye, Sparkles } from "lucide-react";

export interface ServiceItem {
  name: string;
  price: string;
  duration: string; // in minutes format like "45 mins" or "1 hr 30 mins"
}

export interface ServiceCategory {
  icon: typeof Sparkles;
  title: string;
  description: string;
  services: ServiceItem[];
}

export const serviceCategories: ServiceCategory[] = [
  {
    icon: Hand,
    title: "Nails",
    description: "Acrylic, Gel Builder (BIAB), Hard Gel, Nail Polishes, Nail Art & Manicure services",
    services: [
      { name: "Acrylic Nails", price: "GH₵150", duration: "1 hr 30 mins" },
      { name: "Gel Builder (BIAB)", price: "GH₵120", duration: "1 hr 15 mins" },
      { name: "Hard Gel", price: "GH₵130", duration: "1 hr 30 mins" },
      { name: "Nail Art & Manicure", price: "GH₵80", duration: "45 mins" },
    ],
  },
  {
    icon: Footprints,
    title: "Pedicure",
    description: "Luxurious foot care treatments for ultimate relaxation",
    services: [
      { name: "Classic Pedicure", price: "GH₵100", duration: "45 mins" },
      { name: "iSparkle Signature Pedicure with gel", price: "GH₵180", duration: "1 hr 15 mins" },
      { name: "Jelly Pedicure", price: "GH₵200", duration: "1 hr 30 mins" },
    ],
  },
  {
    icon: Smile,
    title: "Facials",
    description: "Rejuvenating facial treatments for glowing skin",
    services: [
      { name: "Deep Cleansing Facial", price: "GH₵250", duration: "1 hr" },
      { name: "Hydra Facial", price: "GH₵300", duration: "1 hr 15 mins" },
      { name: "Dermaplaning Facial", price: "GH₵300", duration: "1 hr" },
      { name: "High Frequency Facial", price: "GH₵300", duration: "1 hr 15 mins" },
      { name: "Brightening Facial", price: "GH₵300", duration: "1 hr" },
    ],
  },
  {
    icon: Heart,
    title: "Massages",
    description: "Therapeutic massage treatments for body and mind",
    services: [
      { name: "Swedish Massage", price: "GH₵250", duration: "1 hr" },
      { name: "Deep Tissue Massage", price: "GH₵300", duration: "1 hr 15 mins" },
      { name: "Hot Stone Massage", price: "GH₵400", duration: "1 hr 30 mins" },
      { name: "Back & Neck Massage", price: "GH₵150", duration: "30 mins" },
    ],
  },
  {
    icon: Scissors,
    title: "Waxing",
    description: "Professional waxing services for smooth, flawless skin",
    services: [
      { name: "Eye Brow", price: "GH₵70", duration: "15 mins" },
      { name: "Chin", price: "GH₵70", duration: "15 mins" },
      { name: "Upper Lip", price: "GH₵50", duration: "10 mins" },
      { name: "Bikini", price: "GH₵200", duration: "30 mins" },
      { name: "Back", price: "GH₵400", duration: "45 mins" },
      { name: "Leg", price: "GH₵250", duration: "45 mins" },
    ],
  },
  {
    icon: Eye,
    title: "Mink Eyelashes",
    description: "Beautiful lash extensions to enhance your eyes",
    services: [
      { name: "Classic Lashes", price: "GH₵200", duration: "1 hr 30 mins" },
      { name: "Hybrid Lashes", price: "GH₵250", duration: "1 hr 45 mins" },
      { name: "Cat Eye Lashes", price: "GH₵250", duration: "1 hr 45 mins" },
      { name: "Volume Mink Lashes", price: "GH₵300", duration: "2 hrs" },
    ],
  },
  {
    icon: Sparkles,
    title: "Other Services",
    description: "Additional beauty and wellness treatments",
    services: [
      { name: "Cavitation Treatment", price: "GH₵400", duration: "45 mins" },
    ],
  },
];
