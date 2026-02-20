import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, Mail } from "lucide-react";

const features = [
  "Standard edit £49.99 per video",
  "Up to 6 revisions included",
  "3–4 day turnaround",
  "Minimum view performance guarantee",
  "Direct chat with your editor",
  "Editors available anytime",
];

const Pricing = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="pricing" className="py-24 md:py-32 bg-card/40">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-secondary mb-3">
            Pricing
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            Transparent & Simple
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-2xl mx-auto p-8 rounded-2xl bg-card border border-border shadow-card"
        >
          <div className="text-center mb-8">
            <h3 className="text-4xl font-bold">£29.99</h3>
            <p className="text-muted-foreground mt-2">
              For your first edit - don't miss out :)
            </p>
          </div>

          <ul className="space-y-4 mb-8">
            {features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary mt-1" />
                <span className="text-muted-foreground text-sm">
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          <button className="w-full py-3 rounded-lg bg-gradient-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition">
            <Mail className="w-4 h-4" />
            Mail us - editlab4u@gmail.com
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;