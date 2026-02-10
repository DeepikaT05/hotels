import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { Link } from "react-router-dom";
import { MapPin, Users, Calendar, Crown, Monitor, Palette } from "lucide-react";
import heroImg from "@/assets/hero-hotel.jpg";

const Events = () => {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            {/* Hero */}
            <section className="relative h-[60vh] min-h-[500px]">
                <img src={heroImg} alt="Events at Vivanz Palace" className="w-full h-full object-cover" />
                {/* Dark gradient overlay for better contrast */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
                <div className="absolute inset-0 flex items-center justify-center text-center px-4">
                    <div>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="font-cursive text-accent text-xl sm:text-2xl italic mb-3 drop-shadow-lg tracking-wide"
                        >
                            Celebrate Grandly
                        </motion.p>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="font-display text-5xl sm:text-7xl md:text-8xl font-bold text-white mb-4 drop-shadow-2xl tracking-tight"
                        >
                            Exquisite <span className="gold-gradient-text italic">Events</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="font-cursive text-white/90 text-xl sm:text-2xl italic drop-shadow-lg tracking-wide"
                        >
                            Where Memories Last Forever
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Intro */}
            <section className="section-padding bg-muted/30">
                <div className="container-hotel max-w-4xl text-center">
                    <AnimatedSection>
                        <h2 className="font-display text-3xl sm:text-4xl font-bold text-charcoal mb-6">Plan Your Perfect Event</h2>
                        <div className="gold-line w-24 mx-auto mb-8" />
                        <p className="text-charcoal/80 font-body text-base sm:text-lg leading-relaxed mb-8 font-medium">
                            From intimate gatherings to grand weddings and corporate conferences, Hotel Vivanz Palace offers versatile venues
                            and impeccable service to make every occasion extraordinary. Our dedicated event planning team ensures that every
                            detail is executed to perfection.
                        </p>
                    </AnimatedSection>
                </div>
            </section>

            {/* Venues */}
            <section className="section-padding bg-background">
                <div className="container-hotel max-w-6xl">
                    <AnimatedSection className="text-center mb-12">
                        <h3 className="font-display text-3xl font-bold text-charcoal mb-4">Our Venues</h3>
                        <div className="gold-line w-16 mx-auto" />
                    </AnimatedSection>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Grand Ballroom",
                                capacity: "500 Guests",
                                type: "Weddings & Receptions",
                                desc: "A majestic pillar-less hall with crystal chandeliers and elegant decor."
                            },
                            {
                                title: "Crystal Hall",
                                capacity: "150 Guests",
                                type: "Conferences & Seminars",
                                desc: "Equipped with modern AV technology, ideal for corporate meetings."
                            },
                            {
                                title: "Rooftop Terrace",
                                capacity: "100 Guests",
                                type: "Cocktail Parties",
                                desc: "Stunning views of the city skyline under the stars."
                            }
                        ].map((venue, i) => (
                            <AnimatedSection key={venue.title} delay={i * 0.1}>
                                <div className="glass-card p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-white/50 backdrop-blur-md border border-white/20 h-full flex flex-col justify-between">
                                    <div>
                                        <h4 className="font-display text-xl font-bold text-charcoal mb-2">{venue.title}</h4>
                                        <p className="text-primary font-medium text-sm uppercase tracking-wider mb-4">{venue.type}</p>
                                        <p className="text-charcoal/70 font-body text-sm leading-relaxed mb-6">{venue.desc}</p>
                                    </div>
                                    <div className="flex items-center justify-center gap-2 text-charcoal/60 font-medium bg-secondary/10 py-2 rounded-full">
                                        <Users size={16} />
                                        <span>{venue.capacity}</span>
                                    </div>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services */}
            <section className="section-padding bg-muted/30">
                <div className="container-hotel max-w-5xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <AnimatedSection direction="left">
                            <h3 className="font-display text-3xl font-bold text-charcoal mb-6">Comprehensive Event Services</h3>
                            <div className="gold-line w-16 mb-6" />
                            <ul className="space-y-6">
                                {[
                                    { icon: Crown, title: "Custom Decor", text: "Themed decorations tailored to your vision." },
                                    { icon: Monitor, title: "Audiovisual Support", text: "High-end sound and projection systems." },
                                    { icon: Palette, title: "Culinary Excellence", text: "Curated menus by our master chefs." },
                                    { icon: Calendar, title: "Dedicated Planner", text: "Expert coordination from start to finish." }
                                ].map((service, i) => (
                                    <li key={i} className="flex gap-4">
                                        <div className="bg-primary/10 p-3 rounded-full flex-shrink-0 h-10 w-10 flex items-center justify-center">
                                            <service.icon size={20} className="text-primary" />
                                        </div>
                                        <div>
                                            <h5 className="font-display text-lg font-bold text-charcoal">{service.title}</h5>
                                            <p className="text-charcoal/70 font-body">{service.text}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </AnimatedSection>

                        <AnimatedSection direction="right">
                            <div className="relative h-[500px] rounded-lg overflow-hidden shadow-2xl skew-y-1 transform transition-transform hover:skew-y-0 duration-500">
                                <img src={heroImg} alt="Event Setup" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-6 left-6 right-6 text-white text-center">
                                    <p className="font-cursive text-2xl italic mb-2">Make it unforgettable</p>
                                    <Link
                                        to="/booking"
                                        className="inline-block bg-white text-primary px-8 py-3 text-sm font-body tracking-widest uppercase hover:bg-white/90 transition-all duration-300 rounded-lg font-bold shadow-lg"
                                    >
                                        Inquire Now
                                    </Link>
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Events;
