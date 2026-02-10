import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { Link } from "react-router-dom";
import { CheckCircle, Award, Star, Users } from "lucide-react";
import heroImg from "@/assets/hero-hotel.jpg";

const About = () => {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            {/* Hero */}
            <section className="relative h-[60vh] min-h-[500px]">
                <img src={heroImg} alt="Hotel Vivanz Palace" className="w-full h-full object-cover" />
                {/* Dark gradient overlay for better contrast */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
                <div className="absolute inset-0 flex items-center justify-center text-center px-4">
                    <div>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="font-cursive text-accent text-xl sm:text-2xl italic mb-3 drop-shadow-lg tracking-wide"
                        >
                            Our Story
                        </motion.p>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="font-display text-5xl sm:text-7xl md:text-8xl font-bold text-white mb-4 drop-shadow-2xl tracking-tight"
                        >
                            About <span className="gold-gradient-text italic">Us</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="font-cursive text-white/90 text-xl sm:text-2xl italic drop-shadow-lg tracking-wide"
                        >
                            Tradition of Excellence since 2010
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Intro */}
            <section className="section-padding bg-muted/30">
                <div className="container-hotel max-w-4xl text-center">
                    <AnimatedSection>
                        <h2 className="font-display text-3xl sm:text-4xl font-bold text-charcoal mb-6">A Legacy of Luxury</h2>
                        <div className="gold-line w-24 mx-auto mb-8" />
                        <p className="text-charcoal/80 font-body text-base sm:text-lg leading-relaxed mb-8 font-medium">
                            Nestled in the heart of Bhilai, Hotel Vivanz Palace represents the pinnacle of luxury hospitality in Chhattisgarh.
                            Since our inception, we have been dedicated to providing an experience that seamlessly blends modern amenities with traditional Indian hospitality.
                        </p>
                        <p className="text-charcoal/80 font-body text-base sm:text-lg leading-relaxed mb-12 font-medium">
                            Every detail, from our elegantly appointed rooms to our world-class dining, is curated to offer our guests a stay that is both memorable and comfortable.
                        </p>
                    </AnimatedSection>
                </div>
            </section>

            {/* Values */}
            <section className="section-padding bg-background">
                <div className="container-hotel max-w-5xl">
                    <AnimatedSection className="text-center mb-12">
                        <h3 className="font-display text-3xl font-bold text-charcoal mb-4">Our Core Values</h3>
                        <div className="gold-line w-16 mx-auto" />
                    </AnimatedSection>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Award,
                                title: "Excellence",
                                desc: "Striving for perfection in every aspect of our service."
                            },
                            {
                                icon: Users,
                                title: "Guest First",
                                desc: "Your comfort and satisfaction are our top priorities."
                            },
                            {
                                icon: Star,
                                title: "Integrity",
                                desc: "Honesty and transparency in all our interactions."
                            }
                        ].map((item, i) => (
                            <AnimatedSection key={item.title} delay={i * 0.1}>
                                <div className="glass-card p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-white/50 backdrop-blur-md border border-white/20">
                                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <item.icon size={32} className="text-primary" />
                                    </div>
                                    <h4 className="font-display text-xl font-bold text-charcoal mb-3">{item.title}</h4>
                                    <p className="text-charcoal/70 font-body leading-relaxed">{item.desc}</p>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="section-padding bg-muted/30">
                <div className="container-hotel max-w-4xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <AnimatedSection direction="left">
                            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-2xl">
                                <img src={heroImg} alt="Hotel Interior" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            </div>
                        </AnimatedSection>

                        <AnimatedSection direction="right">
                            <h3 className="font-display text-3xl font-bold text-charcoal mb-6">Why Choose Vivanz Palace?</h3>
                            <div className="gold-line w-16 mb-6" />
                            <ul className="space-y-4">
                                {[
                                    "Prime Location in Bhilai",
                                    "Luxurious & Spacious Rooms",
                                    "Multi-Cuisine Fine Dining",
                                    "State-of-the-art Banquet Halls",
                                    "24/7 Room Service & Security"
                                ].map((item, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex items-center gap-3 text-lg text-charcoal/80 font-body font-medium"
                                    >
                                        <CheckCircle size={20} className="text-primary flex-shrink-0" />
                                        <span>{item}</span>
                                    </motion.li>
                                ))}
                            </ul>

                            <div className="mt-8">
                                <Link
                                    to="/booking"
                                    className="inline-block bg-gradient-to-r from-primary to-accent text-white px-8 py-3 text-sm font-body tracking-widest uppercase hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 w-full sm:w-auto text-center rounded-lg font-bold"
                                >
                                    Book Your Stay
                                </Link>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default About;
