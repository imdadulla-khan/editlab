import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const About = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-card/50" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-secondary mb-3">
            About
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-10">
            Team EDITLAB
          </h2>
          <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
            We are a team of video editors focused on storytelling, rhythm, and emotion.
          </p>
          <p className="text-lg md:text-xl leading-relaxed text-muted-foreground mt-6">
            From fast-paced reels to cinematic long-form edits, every frame is
            cut with intent — to engage audiences, elevate brands, and leave a
            lasting impression.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
