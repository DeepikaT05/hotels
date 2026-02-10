import AnimatedSection from "./AnimatedSection";
import { Link } from "react-router-dom";
import { Leaf, Globe, Sparkles, Users, Utensils, ChefHat } from "lucide-react";
import restaurantImg from "@/assets/restaurant.jpg";

const RestaurantSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img src={restaurantImg} alt="Maple Restaurant" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/85 backdrop-blur-sm" />
      </div>

      <div className="relative section-padding">
        <div className="container-hotel">
          <AnimatedSection className="text-center mb-12">
            <p className="font-cursive text-primary text-xl italic mb-2">Enjoy Food & Beverage Menu</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-2">
              Maple Restaurant
            </h2>
            <p className="font-cursive text-primary/80 text-lg italic mb-4">Eat from the land</p>
            <div className="gold-line w-16 mx-auto mb-6" />
            <p className="text-muted-foreground font-body max-w-2xl mx-auto text-sm leading-relaxed">
              Welcome to MAPLE, the signature restaurant at Hotel Vivanz Palace in Bhilai, Chhattisgarh. 
              Step into a world of gastronomic excellence where flavors come alive, and dining experiences 
              are crafted with utmost care and attention to detail.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Restaurant Features */}
            <AnimatedSection direction="left" delay={0.1}>
              <div className="glass-card p-8">
                <h3 className="font-display text-lg text-foreground mb-4">Restaurant</h3>
                <div className="gold-line w-12 mb-4" />
                <ul className="space-y-3">
                  {[
                    { icon: Leaf, text: "Healthy Food" },
                    { icon: Sparkles, text: "Indian Delicacies" },
                    { icon: Globe, text: "International Culinary Delights" },
                  ].map(({ icon: Icon, text }) => (
                    <li key={text} className="flex items-center gap-3 text-sm text-muted-foreground font-body">
                      <Icon size={16} className="text-primary" />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>

            {/* Dining Features */}
            <AnimatedSection direction="right" delay={0.2}>
              <div className="glass-card p-8">
                <h3 className="font-display text-lg text-foreground mb-4">Dining</h3>
                <div className="gold-line w-12 mb-4" />
                <ul className="space-y-3">
                  {[
                    { icon: Users, text: "Private Dining and Celebrations" },
                    { icon: Utensils, text: "Exquisite Dining Ambiance" },
                    { icon: ChefHat, text: "Buffet Spreads and Live Stations" },
                  ].map(({ icon: Icon, text }) => (
                    <li key={text} className="flex items-center gap-3 text-sm text-muted-foreground font-body">
                      <Icon size={16} className="text-primary" />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection className="text-center mt-10" delay={0.3}>
            <Link
              to="/dining"
              className="inline-block border border-primary text-primary px-8 py-3 text-sm font-body tracking-widest uppercase hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              Explore Menu
            </Link>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default RestaurantSection;
