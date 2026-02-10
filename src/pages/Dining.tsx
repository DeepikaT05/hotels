import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { Link } from "react-router-dom";
import { Leaf, Globe, Sparkles, Users, Utensils, ChefHat, Clock, Star } from "lucide-react";
import restaurantImg from "@/assets/restaurant.jpg";

const menuItems = [
  { name: "Paneer Tikka", category: "Starters", price: "₹350" },
  { name: "Butter Chicken", category: "Main Course", price: "₹450" },
  { name: "Dal Makhani", category: "Main Course", price: "₹320" },
  { name: "Biryani Special", category: "Rice", price: "₹400" },
  { name: "Gulab Jamun", category: "Desserts", price: "₹200" },
  { name: "Masala Dosa", category: "South Indian", price: "₹250" },
];

const Dining = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[500px]">
        <img src={restaurantImg} alt="Maple Restaurant" className="w-full h-full object-cover" />
        {/* Dark gradient overlay for better contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-cursive text-accent text-xl sm:text-2xl italic mb-3 drop-shadow-lg tracking-wide"
            >
              A Culinary Delight
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-5xl sm:text-7xl md:text-8xl font-bold text-white mb-4 drop-shadow-2xl tracking-tight"
            >
              Maple <span className="gold-gradient-text italic">Restaurant</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="font-cursive text-white/90 text-xl sm:text-2xl italic drop-shadow-lg tracking-wide"
            >
              Eat from the land
            </motion.p>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="section-padding bg-muted/30">
        <div className="container-hotel max-w-4xl text-center">
          <AnimatedSection>
            <p className="text-charcoal/80 font-body text-base sm:text-lg leading-relaxed mb-8 font-medium">
              Welcome to MAPLE, the signature restaurant at Hotel Vivanz Palace in Bhilai, Chhattisgarh.
              Step into a world of gastronomic excellence where flavors come alive, and dining experiences
              are crafted with utmost care and attention to detail.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: Clock, label: "Timing", value: "7 AM - 11 PM" },
              { icon: Star, label: "Cuisine", value: "Multi-Cuisine" },
              { icon: Users, label: "Capacity", value: "120 Guests" },
            ].map(({ icon: Icon, label, value }, i) => (
              <AnimatedSection key={label} delay={i * 0.1}>
                <div className="glass-card p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <Icon size={28} className="text-primary mx-auto mb-3" />
                  <p className="font-display text-charcoal font-semibold text-lg mb-1">{label}</p>
                  <p className="text-charcoal/70 text-sm font-body font-medium">{value}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-background">
        <div className="container-hotel max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatedSection direction="left">
              <div className="glass-card p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <h3 className="font-display text-2xl text-charcoal font-bold mb-4">Restaurant Highlights</h3>
                <div className="gold-line w-12 mb-6" />
                <ul className="space-y-4">
                  {[
                    { icon: Leaf, text: "Healthy Food" },
                    { icon: Sparkles, text: "Indian Delicacies" },
                    { icon: Globe, text: "International Culinary Delights" },
                  ].map(({ icon: Icon, text }) => (
                    <li key={text} className="flex items-center gap-3 text-base text-charcoal/80 font-body font-medium">
                      <Icon size={20} className="text-primary" />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
            <AnimatedSection direction="right">
              <div className="glass-card p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <h3 className="font-display text-2xl text-charcoal font-bold mb-4">Dining Experience</h3>
                <div className="gold-line w-12 mb-6" />
                <ul className="space-y-4">
                  {[
                    { icon: Users, text: "Private Dining and Celebrations" },
                    { icon: Utensils, text: "Exquisite Dining Ambiance" },
                    { icon: ChefHat, text: "Buffet Spreads and Live Stations" },
                  ].map(({ icon: Icon, text }) => (
                    <li key={text} className="flex items-center gap-3 text-base text-charcoal/80 font-body font-medium">
                      <Icon size={20} className="text-primary" />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Sample Menu */}
      <section className="section-padding bg-muted/30">
        <div className="container-hotel max-w-3xl">
          <AnimatedSection className="text-center mb-12">
            <p className="font-cursive text-accent text-xl sm:text-2xl italic mb-3 tracking-wide">Taste the Excellence</p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-charcoal mb-4">
              Sample <span className="gold-gradient-text italic">Menu</span>
            </h2>
            <div className="gold-line w-16 mx-auto" />
          </AnimatedSection>

          <div className="space-y-2 bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-xl">
            {menuItems.map((item, i) => (
              <AnimatedSection key={item.name} delay={i * 0.05}>
                <div className="flex items-center justify-between py-5 border-b border-primary/20 hover:bg-primary/5 px-4 rounded transition-colors">
                  <div>
                    <h4 className="font-display text-charcoal font-semibold text-lg">{item.name}</h4>
                    <p className="text-xs text-charcoal/60 font-body tracking-wider uppercase font-medium mt-1">{item.category}</p>
                  </div>
                  <span className="text-primary font-display text-xl font-bold">{item.price}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center mt-12">
            <Link
              to="/booking"
              className="inline-block bg-gradient-to-r from-primary to-accent text-white px-10 py-4 text-sm font-body tracking-widest uppercase hover:shadow-xl transition-all duration-300 rounded-lg font-bold"
            >
              Reserve a Table
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Dining;
