import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import AnimatedSection from "./AnimatedSection";
import { Wifi, UtensilsCrossed, Wind, Bus } from "lucide-react";
import roomPresidential from "@/assets/room-presidential.jpg";
import roomSuite from "@/assets/room-suite.jpg";
import roomStudio from "@/assets/room-studio.jpg";
import roomExecutive from "@/assets/room-executive.jpg";

const featuredRooms = [
  {
    name: "Presidential Suite",
    image: roomPresidential,
    features: ["Shuttle Service", "Breakfast", "Air Conditioner", "Fibre Internet"],
    featured: true,
  },
  {
    name: "Vivanz Palace Suite",
    image: roomSuite,
    features: ["Shuttle Service", "Breakfast", "Air Conditioner", "Fibre Internet"],
    featured: true,
  },
];

const smallRooms = [
  { name: "Studio Suite", image: roomStudio },
  { name: "Executive City View", image: roomExecutive },
  { name: "Executive", image: roomPresidential },
];

const featureIcons: Record<string, typeof Wifi> = {
  "Shuttle Service": Bus,
  "Breakfast": UtensilsCrossed,
  "Air Conditioner": Wind,
  "Fibre Internet": Wifi,
};

const RoomsPreview = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-hotel">
        <AnimatedSection className="text-center mb-12">
          <p className="font-cursive text-primary text-xl italic mb-2">Best Price</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            The Best Luxury <span className="gold-gradient-text italic">Rooms & Suites</span>
          </h2>
          <div className="gold-line w-16 mx-auto" />
        </AnimatedSection>

        {/* Featured Rooms */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {featuredRooms.map((room, i) => (
            <AnimatedSection key={room.name} delay={i * 0.15}>
              <motion.div
                whileHover={{ y: -4 }}
                className="glass-card overflow-hidden group"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl text-foreground mb-3">{room.name}</h3>
                  <div className="flex flex-wrap gap-3 mb-4">
                    {room.features.map((f) => {
                      const Icon = featureIcons[f];
                      return (
                        <span key={f} className="flex items-center gap-1.5 text-xs text-muted-foreground font-body">
                          {Icon && <Icon size={12} className="text-primary" />}
                          {f}
                        </span>
                      );
                    })}
                  </div>
                  <Link
                    to="/booking"
                    className="inline-block bg-primary text-primary-foreground px-6 py-2 text-xs font-body tracking-widest uppercase hover:bg-primary/90 transition-colors"
                  >
                    Book Now
                  </Link>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* Small Room Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {smallRooms.map((room, i) => (
            <AnimatedSection key={room.name} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                className="relative h-56 overflow-hidden group cursor-pointer"
              >
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-display text-lg text-foreground uppercase tracking-wide">{room.name}</h3>
                  <Link
                    to="/booking"
                    className="text-primary text-xs font-body tracking-widest uppercase mt-1 inline-block hover:text-gold-light transition-colors"
                  >
                    Book Now →
                  </Link>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoomsPreview;
