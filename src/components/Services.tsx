import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Film, Smartphone, Clapperboard, Megaphone } from "lucide-react";

const services = [
  {
    icon: Film,
    title: "YouTube Video Editing",
    description:
      "Engaging edits optimized for retention — intros, cuts, graphics, and pacing that keeps viewers watching.",
  },
  {
    icon: Smartphone,
    title: "Short-form Reels",
    description:
      "Punchy, scroll-stopping edits for Instagram Reels, TikTok, and YouTube Shorts.",
  },
  {
    icon: Clapperboard,
    title: "Cinematic Brand Films",
    description:
      "Story-driven films with cinematic color grading, sound design, and premium finishing.",
  },
  {
    icon: Megaphone,
    title: "Promotional Ads",
    description:
      "High-converting ad edits crafted for impact across digital platforms.",
  },
];

const Services = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="services" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-secondary mb-3">
            Services
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            What I Offer
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group p-6 rounded-xl bg-card border border-border hover:border-primary/40 transition-all duration-300 shadow-card hover:shadow-glow"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
