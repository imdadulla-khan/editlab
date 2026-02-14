import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Play } from "lucide-react";

const projects = [
  {
    title: "Brand Film — Elevate",
    description: "A cinematic brand story for a luxury lifestyle company.",
    videoId: "HiDChLf9fNk",
    platform: "youtube" as const,
  },
  {
    title: "Music Video — Echoes",
    description: "Fast-paced editing with dynamic color grading.",
    videoId: "kMzB5C0RUVg",
    platform: "youtube" as const,
  },
  {
    title: "Product Launch — Aura",
    description: "Sleek promotional edit for a tech product reveal.",
    videoId: "dQw4w9WgXcQ",
    platform: "youtube" as const,
  },
  {
    title: "Short-form — Momentum",
    description: "Vertical reel edit optimized for social engagement.",
    videoId: "ScMzIvxBSi4",
    platform: "youtube" as const,
  },
];

const VideoCard = ({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [playing, setPlaying] = useState(false);

  const thumbnailUrl = `https://img.youtube.com/vi/${project.videoId}/hqdefault.jpg`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <div className="relative aspect-video rounded-lg overflow-hidden bg-card shadow-card">
        {!playing ? (
          <button
            onClick={() => setPlaying(true)}
            className="w-full h-full relative"
            aria-label={`Play ${project.title}`}
          >
            <img
              src={thumbnailUrl}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-background/40 group-hover:bg-background/20 transition-colors duration-300 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 text-primary-foreground ml-1" />
              </div>
            </div>
          </button>
        ) : (
          <iframe
            src={`https://www.youtube.com/embed/${project.videoId}?autoplay=1`}
            title={project.title}
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="w-full h-full"
          />
        )}
      </div>
      <div className="mt-4">
        <h3 className="font-display text-lg font-semibold text-foreground">
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          {project.description}
        </p>
      </div>
    </motion.div>
  );
};

const Portfolio = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="work" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-3xl md:text-5xl tracking-[0.3em] uppercase text-secondary mb-3">
            Portfolio
          </p>            
          
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <VideoCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
