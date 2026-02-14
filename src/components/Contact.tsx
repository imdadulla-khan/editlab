import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send } from "lucide-react";
import emailjs from "emailjs-com";

const Contact = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const valid =
    form.name.trim() &&
    form.email.includes("@") &&
    form.message.trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;

    setStatus("loading");

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setStatus("success");
      setForm({ name: "", email: "", message: "" });

      setTimeout(() => setStatus("idle"), 4000);
    } catch (err) {
      console.error(err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-card/50" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-secondary mb-3">
            Contact
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            Let's Work Together
          </h2>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto space-y-6"
        >
          <input
            type="text"
            placeholder="Your name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            className="w-full px-4 py-3 rounded-lg bg-card border border-border"
          />

          <input
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            className="w-full px-4 py-3 rounded-lg bg-card border border-border"
          />

          <textarea
            rows={5}
            placeholder="Tell me about your project..."
            value={form.message}
            onChange={(e) =>
              setForm({ ...form, message: e.target.value })
            }
            className="w-full px-4 py-3 rounded-lg bg-card border border-border resize-none"
          />

          <button
            type="submit"
            disabled={!valid || status === "loading"}
            className="w-full py-3.5 rounded-lg bg-gradient-primary font-semibold text-primary-foreground flex items-center justify-center gap-2 disabled:opacity-40"
          >
            <Send className="w-4 h-4" />
            {status === "loading" ? "Sending..." : "Send Message"}
          </button>

          {status === "success" && (
            <p className="text-center text-sm text-secondary">
              Message sent successfully! I’ll get back to you soon.
            </p>
          )}

          {status === "error" && (
            <p className="text-center text-sm text-red-400">
              Something went wrong. Please try again later.
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;