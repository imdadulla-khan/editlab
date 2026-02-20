import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail } from "lucide-react";
import emailjs from "emailjs-com";

const Newsletter = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const valid = email.includes("@");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;

    setStatus("loading");

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_NEWSLETTER_TEMPLATE_ID,
        {
          subscriber_email: email,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setStatus("success");
      setEmail("");

      setTimeout(() => setStatus("idle"), 4000);
    } catch (err) {
      console.error(err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="w-14 h-14 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-6">
            <Mail className="w-6 h-6 text-primary-foreground" />
          </div>

          <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">
            Stay in the Loop
          </h2>

          <p className="text-muted-foreground mb-8">
            Get editing tips, behind-the-scenes, and project updates — no spam,
            ever.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              aria-label="Email address"
              className="flex-1 px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
            />

            <button
              type="submit"
              disabled={!valid || status === "loading"}
              className="px-6 py-3 rounded-lg bg-gradient-primary font-semibold text-primary-foreground shadow-glow hover:opacity-90 transition-opacity disabled:opacity-40"
            >
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </button>
          </form>

          <p className="text-xs text-muted-foreground mt-4">
            By subscribing you agree to our Privacy Policy. Unsubscribe anytime.
          </p>

          {status === "success" && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-secondary mt-4"
            >
              ✓ You’re subscribed! Welcome aboard.
            </motion.p>
          )}

          {status === "error" && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-red-400 mt-4"
            >
              Something went wrong. Please try again later.
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;