import AnimatedSection from "./AnimatedSection";
import { Link } from "react-router-dom";

const ContactSection = () => {
  return (
    <section className="section-padding bg-card">
      <div className="container-hotel text-center">
        <AnimatedSection>
          <p className="font-cursive text-primary text-xl italic mb-2">Contact Us</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Experience the Epitome of Hospitality
          </h2>
          <p className="font-cursive text-foreground/80 text-lg italic mb-2">at Hotel Vivanz Palace</p>
          <div className="gold-line w-16 mx-auto mb-6" />
          <p className="text-muted-foreground font-body max-w-2xl mx-auto text-sm leading-relaxed mb-8">
            At Hotel Vivanz Palace, we are dedicated to providing an unparalleled level of luxury and comfort, 
            coupled with exceptional amenities and services.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/about"
              className="border border-primary text-primary px-8 py-3 text-sm font-body tracking-widest uppercase hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              Discover More
            </Link>
            <a
              href="tel:+919617774022"
              className="bg-primary text-primary-foreground px-8 py-3 text-sm font-body tracking-widest uppercase hover:bg-primary/90 transition-colors"
            >
              Call Us
            </a>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2} className="mt-12">
          <p className="font-cursive text-muted-foreground italic text-base">
            Great hospitality is the key to Pride of DHILLON's longstanding reputation for excellence.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ContactSection;
