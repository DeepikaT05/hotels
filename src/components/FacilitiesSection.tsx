import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { Wifi, Car, UtensilsCrossed, Shield, Dumbbell, ConciergeBell } from "lucide-react";

const facilities = [
  { icon: ConciergeBell, title: "Room Service", desc: "We will provide you such service that you will feel like a royal guest." },
  { icon: Dumbbell, title: "Gym", desc: "Keeping your health in mind, we have also provided gyms for fitness." },
  { icon: Car, title: "Parking Space", desc: "Rest assured there is plenty of space available to park your car/vehicle." },
  { icon: UtensilsCrossed, title: "Breakfast", desc: "You will find breakfast very tasty and will also get the different taste of India." },
  { icon: Shield, title: "Safety & Security", desc: "We are very cautious about security. You can live with no worries." },
  { icon: Wifi, title: "Fibre Internet", desc: "You get a fast network connection that you can enjoy all day at your convenience." },
];

const FacilitiesSection = () => {
  return (
    <section className="section-padding bg-card">
      <div className="container-hotel">
        <AnimatedSection className="text-center mb-12">
          <p className="font-cursive text-primary text-xl italic mb-2">Our Amenities</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Facilities We <span className="gold-gradient-text italic">Provide</span>
          </h2>
          <div className="gold-line w-16 mx-auto mb-4" />
          <p className="text-muted-foreground font-body max-w-lg mx-auto text-sm">
            Taking care of your every convenience is our first responsibility.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((item, i) => (
            <AnimatedSection key={item.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6, boxShadow: "0 0 30px hsl(43 85% 55% / 0.15)" }}
                transition={{ duration: 0.3 }}
                className="glass-card p-8 text-center group cursor-pointer"
              >
                <div className="w-14 h-14 mx-auto mb-4 border border-primary/20 rounded-full flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/5 transition-all duration-300">
                  <item.icon size={24} className="text-primary" />
                </div>
                <h3 className="font-display text-lg text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm font-body leading-relaxed">{item.desc}</p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FacilitiesSection;
