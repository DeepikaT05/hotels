import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Instagram, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-primary/10">
      <div className="container-hotel py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h3 className="font-cursive text-3xl gold-gradient-text mb-4">Vivanz Palace</h3>
            <p className="text-muted-foreground text-sm leading-relaxed font-body">
              A haven of luxury and comfort nestled in the vibrant city of Bhilai, Chhattisgarh.
            </p>
            <div className="flex gap-4 mt-6">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg text-foreground mb-4">Quick Links</h4>
            <div className="gold-line mb-4 w-12" />
            <ul className="space-y-3">
              {["Home", "About Us", "Rooms & Suites", "Dining", "Events"].map((item) => (
                <li key={item}>
                  <Link
                    to={item === "Home" ? "/" : `/${item.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`}
                    className="text-muted-foreground text-sm font-body hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg text-foreground mb-4">Contact Us</h4>
            <div className="gold-line mb-4 w-12" />
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-muted-foreground font-body">
                <MapPin size={16} className="text-primary mt-0.5 shrink-0" />
                Bhilai, Chhattisgarh, India
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground font-body">
                <Phone size={16} className="text-primary shrink-0" />
                +91-9617774022
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground font-body">
                <Mail size={16} className="text-primary shrink-0" />
                info@vivanzpalace.com
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-display text-lg text-foreground mb-4">Stay Connected</h4>
            <div className="gold-line mb-4 w-12" />
            <p className="text-muted-foreground text-sm font-body mb-4">
              Subscribe for exclusive offers and updates.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-muted border border-primary/10 px-4 py-2.5 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/30"
              />
              <button className="bg-primary text-primary-foreground px-4 py-2.5 text-sm font-body tracking-wider uppercase hover:bg-primary/90 transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="gold-line mt-12 mb-6" />
        <p className="text-center text-muted-foreground text-xs font-body tracking-wider">
          Copyright © 2026 Hotel Vivanz Palace. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
