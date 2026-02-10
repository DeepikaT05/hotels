import AnimatedSection from "./AnimatedSection";
import { Link } from "react-router-dom";

const AboutSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-hotel">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection direction="left">
            <p className="font-cursive text-primary text-xl italic mb-2">Discover</p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
              Hotel <span className="gold-gradient-text italic">Vivanz Palace</span>
            </h2>
            <div className="gold-line w-16 mb-6" />
            <p className="text-muted-foreground font-body leading-relaxed mb-6">
              Welcome to Hotel Vivanz Palace, a haven of luxury and comfort nestled in the vibrant city of Bhilai, 
              Chhattisgarh. It has been synonymous with exceptional hospitality, unmatched service, and an 
              unforgettable experience.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Establishment Hotel Vivanz Palace is in the year 2008.",
                "Our '4-Star Hotel' offers a perfect blend of modern amenities.",
                "Whenever you are visiting at Vivanz Palace our warm hospitality and impeccable service make your stay truly memorable.",
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-primary mt-1.5 text-xs">✦</span>
                  <span className="text-muted-foreground text-sm font-body leading-relaxed">{text}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/about"
                className="border border-primary text-primary px-6 py-2.5 text-sm font-body tracking-widest uppercase hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                Discover More
              </Link>
              <Link
                to="/booking"
                className="bg-primary text-primary-foreground px-6 py-2.5 text-sm font-body tracking-widest uppercase hover:bg-primary/90 transition-colors"
              >
                Book Now
              </Link>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right" delay={0.2}>
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-primary/30" />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-primary/30" />
              <div className="bg-card p-8 text-center">
                <p className="font-cursive text-6xl sm:text-7xl gold-gradient-text font-bold mb-2">17+</p>
                <p className="font-body text-sm tracking-widest uppercase text-muted-foreground">Years of Excellence</p>
                <div className="gold-line w-16 mx-auto my-4" />
                <p className="font-cursive text-primary text-lg italic">Since 2008</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
