import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Features", href: "#product-demo" },
    // { label: "Pricing", href: "#pricing" },
    // { label: "About", href: "#about" },
    { label: "Contact", href: "mailto:kshrey10@wharton.upenn.edu" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src="/procuro_icon_white_bg.png" alt="Procura Logo" className="h-12" />
            <span className="text-xl font-bold font-gilroy text-foreground flex items-end gap-2">
              Procura
              <span className="text-xs font-normal text-muted-foreground mb-0.5">by Procuro Labs</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                onClick={item.label === "Features" ? (e) => {
                  e.preventDefault();
                  const section = document.querySelector('[data-section="product-demo"]');
                  if (section) section.scrollIntoView({ behavior: 'smooth' });
                } : undefined}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/early-access">
              <Button variant="enterprise">Get Early Access</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 py-2"
                  onClick={(e) => {
                    setIsMenuOpen(false);
                    if (item.label === "Features") {
                      e.preventDefault();
                      const section = document.querySelector('[data-section="product-demo"]');
                      if (section) section.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  {item.label}
                </a>
              ))}
              <div className="flex flex-col gap-2 pt-4">
                <Button variant="ghost" className="justify-start">Sign In</Button>
                <Link to="/early-access">
                  <Button variant="enterprise" className="justify-start w-full">Get Early Access</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};