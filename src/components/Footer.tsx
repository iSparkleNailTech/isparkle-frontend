import { Sparkles } from "lucide-react";
import logo from "@/assets/isparkle-logo.jpeg";

const Footer = () => {
  return (
    <footer className="py-12 bg-charcoal-light border-t border-border/50">
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
              <p className="text-muted-foreground text-sm">You Deserve It</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <a href="#services" className="text-muted-foreground hover:text-primary transition-colors">
              Services
            </a>
            <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
              Contact
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Terms
            </a>
          </nav>

          {/* Copyright */}
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>© 2026 iSparkle. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
