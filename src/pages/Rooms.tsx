import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { Wifi, UtensilsCrossed, Wind, Bus, Bath, Tv } from "lucide-react";
import roomPresidential from "@/assets/room-presidential.jpg";
import roomSuite from "@/assets/room-suite.jpg";
import roomStudio from "@/assets/room-studio.jpg";
import roomExecutive from "@/assets/room-executive.jpg";

const rooms = [
  {
    name: "Presidential Suite",
    image: roomPresidential,
    price: "₹12,000",
    desc: "Experience royalty in our finest suite with panoramic views, a private living area, and premium amenities.",
    features: ["Shuttle Service", "Breakfast", "Air Conditioner", "Fibre Internet", "Jacuzzi", "Smart TV"],
  },
  {
    name: "Vivanz Palace Suite",
    image: roomSuite,
    price: "₹8,500",
    desc: "A spacious suite combining elegance and comfort with a separate living room and luxury furnishings.",
    features: ["Shuttle Service", "Breakfast", "Air Conditioner", "Fibre Internet", "Smart TV"],
  },
  {
    name: "Studio Suite",
    image: roomStudio,
    price: "₹6,500",
    desc: "A modern studio suite perfect for both business and leisure travelers seeking contemporary comfort.",
    features: ["Breakfast", "Air Conditioner", "Fibre Internet", "Smart TV"],
  },
  {
    name: "Executive City View",
    image: roomExecutive,
    price: "₹5,500",
    desc: "Enjoy stunning city views from this elegantly appointed executive room with premium bedding.",
    features: ["Breakfast", "Air Conditioner", "Fibre Internet", "Smart TV"],
  },
  {
    name: "Executive Room",
    image: roomPresidential,
    price: "₹4,500",
    desc: "A comfortable and well-appointed room ideal for the discerning traveler seeking quality and value.",
    features: ["Breakfast", "Air Conditioner", "Fibre Internet"],
  },
];

const iconMap: Record<string, typeof Wifi> = {
  "Shuttle Service": Bus,
  "Breakfast": UtensilsCrossed,
  "Air Conditioner": Wind,
  "Fibre Internet": Wifi,
  "Jacuzzi": Bath,
  "Smart TV": Tv,
};

const Rooms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Page Header */}
      <section className="pt-28 pb-16 bg-card">
        <div className="container-hotel text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-cursive text-primary text-xl italic mb-2"
          >
            Luxury Awaits
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4"
          >
            Rooms & <span className="gold-gradient-text italic">Suites</span>
          </motion.h1>
          <div className="gold-line w-16 mx-auto" />
        </div>
      </section>

      {/* Room Listings */}
      <section className="section-padding">
        <div className="container-hotel space-y-12">
          {rooms.map((room, i) => (
            <AnimatedSection key={room.name}>
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${i % 2 !== 0 ? "lg:direction-rtl" : ""}`}>
                <div className={`${i % 2 !== 0 ? "lg:order-2" : ""}`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="relative h-72 sm:h-80 overflow-hidden"
                  >
                    <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
                    <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-4 py-1.5 text-sm font-body tracking-wider">
                      {room.price} <span className="text-xs opacity-80">/ night</span>
                    </div>
                  </motion.div>
                </div>
                <div className={`${i % 2 !== 0 ? "lg:order-1" : ""}`}>
                  <h2 className="font-display text-2xl sm:text-3xl text-foreground mb-3">{room.name}</h2>
                  <div className="gold-line w-12 mb-4" />
                  <p className="text-muted-foreground font-body text-sm leading-relaxed mb-6">{room.desc}</p>
                  <div className="flex flex-wrap gap-3 mb-6">
                    {room.features.map((f) => {
                      const Icon = iconMap[f];
                      return (
                        <span key={f} className="flex items-center gap-1.5 bg-muted px-3 py-1.5 text-xs text-muted-foreground font-body">
                          {Icon && <Icon size={12} className="text-primary" />}
                          {f}
                        </span>
                      );
                    })}
                  </div>
                  <Link
                    to="/booking"
                    className="inline-block bg-primary text-primary-foreground px-8 py-3 text-sm font-body tracking-widest uppercase hover:bg-primary/90 transition-colors"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Rooms;
