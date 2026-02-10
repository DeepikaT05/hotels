import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const HeroSection = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: [0.6, 0.01, 0.05, 0.95] as const,
      },
    }),
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.01, 0.05, 0.95] as const,
      },
    },
  };

  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div
        style={{ scale }}
        className="absolute inset-0 z-0"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/hero-bg.png')",
          }}
        />
        {/* Darker Gradient Overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />
      </motion.div>

      {/* Hero Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 pb-32"
      >
        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ delay: 0.2 }}
          className="font-cursive text-accent text-xl sm:text-2xl italic mb-2 drop-shadow-lg"
        >
          Welcome to
        </motion.p>

        {/* Animated Title with Letter-by-Letter Animation */}
        <div className="mb-4">
          <motion.h1
            className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight"
            initial="hidden"
            animate="visible"
          >
            <motion.span className="block text-white drop-shadow-2xl mb-2">
              {"HOTEL".split("").map((letter, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={letterVariants}
                  className="inline-block"
                >
                  {letter}
                </motion.span>
              ))}
            </motion.span>
            <motion.span className="block gradient-text italic drop-shadow-2xl">
              {"Vivanz Palace".split("").map((letter, i) => (
                <motion.span
                  key={i}
                  custom={i + 5}
                  variants={letterVariants}
                  className="inline-block"
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </motion.span>
          </motion.h1>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.2, duration: 0.8, ease: "easeInOut" }}
          className="h-1 w-32 bg-gradient-to-r from-primary via-accent to-primary mb-4 rounded-full"
        />

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="font-cursive text-white/95 text-lg sm:text-xl md:text-2xl italic max-w-xl drop-shadow-lg"
        >
          A Luxurious Oasis in Bhilai, Chhattisgarh
        </motion.p>
      </motion.div>

      {/* Booking Bar - Fixed positioning with enhanced animations */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          delay: 1.6,
          duration: 0.8,
          type: "spring",
          stiffness: 100,
        }}
        className="absolute bottom-8 left-0 right-0 z-20 px-4"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-white/95 backdrop-blur-xl border-2 border-primary/20 shadow-2xl p-6 rounded-2xl"
          >
            <div className="flex flex-col sm:flex-row items-stretch justify-center gap-4">
              <motion.div
                className="flex-1 w-full"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <label className="text-xs text-primary font-body tracking-widest uppercase mb-2 block font-semibold">
                  Check In
                </label>
                <input
                  type="date"
                  className="w-full bg-muted/50 border-2 border-border hover:border-primary/40 focus:border-primary text-charcoal text-sm px-4 py-3 font-body focus:outline-none rounded-lg transition-all duration-300"
                />
              </motion.div>
              <motion.div
                className="flex-1 w-full"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <label className="text-xs text-primary font-body tracking-widest uppercase mb-2 block font-semibold">
                  Check Out
                </label>
                <input
                  type="date"
                  className="w-full bg-muted/50 border-2 border-border hover:border-primary/40 focus:border-primary text-charcoal text-sm px-4 py-3 font-body focus:outline-none rounded-lg transition-all duration-300"
                />
              </motion.div>
              <motion.div
                className="flex-1 w-full"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <label className="text-xs text-primary font-body tracking-widest uppercase mb-2 block font-semibold">
                  Guests
                </label>
                <select className="w-full bg-muted/50 border-2 border-border hover:border-primary/40 focus:border-primary text-charcoal text-sm px-4 py-3 font-body focus:outline-none rounded-lg transition-all duration-300 cursor-pointer">
                  <option value="">Select guests</option>
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                  <option value="5">5+ Guests</option>
                </select>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="sm:self-end"
              >
                <Link
                  to="/booking"
                  className="block bg-gradient-to-r from-primary to-accent text-white px-8 py-3.5 text-sm font-body tracking-widest uppercase hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 w-full sm:w-auto text-center whitespace-nowrap rounded-lg font-bold"
                >
                  Book Now
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="text-white/80 drop-shadow-lg" size={32} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
