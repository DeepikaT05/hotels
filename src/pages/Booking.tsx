import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { toast } from "sonner";

const roomTypes = [
  "Presidential Suite - ₹12,000/night",
  "Vivanz Palace Suite - ₹8,500/night",
  "Studio Suite - ₹6,500/night",
  "Executive City View - ₹5,500/night",
  "Executive Room - ₹4,500/night",
];

const Booking = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    room: roomTypes[0],
    guests: "1",
    requests: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Booking request submitted! We'll contact you shortly.", {
      description: `Room: ${form.room.split(" - ")[0]}`,
    });
  };

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-16 bg-card">
        <div className="container-hotel text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-cursive text-primary text-xl italic mb-2"
          >
            Reserve Your Stay
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4"
          >
            Book Your <span className="gold-gradient-text italic">Room</span>
          </motion.h1>
          <div className="gold-line w-16 mx-auto" />
        </div>
      </section>

      <section className="section-padding">
        <div className="container-hotel max-w-2xl">
          <AnimatedSection>
            <form onSubmit={handleSubmit} className="glass-card p-8 sm:p-10 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { label: "Full Name", field: "name", type: "text", placeholder: "Your name" },
                  { label: "Email", field: "email", type: "email", placeholder: "your@email.com" },
                  { label: "Phone", field: "phone", type: "tel", placeholder: "+91-XXXXXXXXXX" },
                  { label: "Guests", field: "guests", type: "number", placeholder: "1" },
                ].map(({ label, field, type, placeholder }) => (
                  <div key={field}>
                    <label className="text-xs text-primary font-body tracking-widest uppercase mb-2 block">{label}</label>
                    <input
                      type={type}
                      value={form[field as keyof typeof form]}
                      onChange={(e) => update(field, e.target.value)}
                      placeholder={placeholder}
                      required={field !== "guests"}
                      className="w-full bg-muted/50 border border-primary/10 text-foreground text-sm px-4 py-3 font-body focus:outline-none focus:border-primary/30 placeholder:text-muted-foreground/50"
                    />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs text-primary font-body tracking-widest uppercase mb-2 block">Check In</label>
                  <input
                    type="date"
                    value={form.checkIn}
                    onChange={(e) => update("checkIn", e.target.value)}
                    required
                    className="w-full bg-muted/50 border border-primary/10 text-foreground text-sm px-4 py-3 font-body focus:outline-none focus:border-primary/30"
                  />
                </div>
                <div>
                  <label className="text-xs text-primary font-body tracking-widest uppercase mb-2 block">Check Out</label>
                  <input
                    type="date"
                    value={form.checkOut}
                    onChange={(e) => update("checkOut", e.target.value)}
                    required
                    className="w-full bg-muted/50 border border-primary/10 text-foreground text-sm px-4 py-3 font-body focus:outline-none focus:border-primary/30"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-primary font-body tracking-widest uppercase mb-2 block">Room Type</label>
                <select
                  value={form.room}
                  onChange={(e) => update("room", e.target.value)}
                  className="w-full bg-muted/50 border border-primary/10 text-foreground text-sm px-4 py-3 font-body focus:outline-none focus:border-primary/30"
                >
                  {roomTypes.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-primary font-body tracking-widest uppercase mb-2 block">Special Requests</label>
                <textarea
                  value={form.requests}
                  onChange={(e) => update("requests", e.target.value)}
                  rows={3}
                  placeholder="Any special requests..."
                  className="w-full bg-muted/50 border border-primary/10 text-foreground text-sm px-4 py-3 font-body focus:outline-none focus:border-primary/30 placeholder:text-muted-foreground/50 resize-none"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-primary text-primary-foreground py-3.5 text-sm font-body tracking-widest uppercase hover:bg-primary/90 transition-colors"
              >
                Confirm Booking
              </motion.button>
            </form>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Booking;
