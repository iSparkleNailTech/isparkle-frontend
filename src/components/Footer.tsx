import { Link } from "react-router-dom";
import { Sparkles, Instagram, Facebook } from "lucide-react";
import logo from "@/assets/isparkle-logo.jpg";

// TikTok icon component
const TikTok = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const Footer = () => {
  return (
    <footer className="py-12 bg-black-light border-t border-border/50">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo and tagline */}
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="iSparkle"
              className="w-12 h-12 rounded-full border border-primary/30"
            />
            <div>
              <span className="font-heading text-xl font-semibold text-foreground">
                iSparkle
              </span>
              <p className="text-cream text-sm">You Deserve It</p>
            </div>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com/isparklesolutions"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream hover:text-primary transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
            {/* <a
              href="https://facebook.com/ISparkle"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream hover:text-primary transition-colors"
            >
              <Facebook className="w-5 h-5" />
            </a> */}
            <a
              href="https://tiktok.com/@isparkle_1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream hover:text-primary transition-colors"
            >
              <TikTok className="w-5 h-5" />
            </a>
          </div>

          {/* Copyright & legal */}
          <div className="flex flex-col items-center md:items-end gap-1 text-cream text-sm">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>© 2026 iSparkle Day Spa. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/privacy-policy"
                className="text-cream/80 hover:text-primary text-xs underline underline-offset-4 transition-colors"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;