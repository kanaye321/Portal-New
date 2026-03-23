import { motion } from "framer-motion";
import { ArrowUpRight, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  href: string;
  category: string;
  isPopular?: boolean;
  status?: "online" | "maintenance" | "offline";
  index?: number;
}

export function ServiceCard({ 
  title, 
  description, 
  icon: Icon, 
  href, 
  category, 
  isPopular, 
  status = "online", 
  index = 0 
}: ServiceCardProps) {
  const categoryColors = {
    DevOps: "from-blue-500/10 to-indigo-500/10 text-blue-600 dark:text-blue-400 border-blue-200/20 dark:border-blue-500/20",
    Infrastructure: "from-cyan-500/10 to-blue-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-200/20 dark:border-cyan-500/20",
    Security: "from-emerald-500/10 to-green-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200/20 dark:border-emerald-500/20",
    Communication: "from-purple-500/10 to-pink-500/10 text-purple-600 dark:text-purple-400 border-purple-200/20 dark:border-purple-500/20",
    "IT Ops": "from-orange-500/10 to-red-500/10 text-orange-600 dark:text-orange-400 border-orange-200/20 dark:border-orange-500/20",
  };

  const statusDots = {
    online: "bg-emerald-500",
    maintenance: "bg-amber-500",
    offline: "bg-red-500",
  };

  const colors = categoryColors[category as keyof typeof categoryColors] || categoryColors.DevOps;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border bg-gradient-to-br p-6 shadow-md hover:shadow-xl transition-all duration-300",
        colors
      )}
    >
      {/* Animated gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Top Right Status */}
      <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className={cn("h-2.5 w-2.5 rounded-full", statusDots[status])}
        />
        {isPopular && (
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-amber-400"
          >
            ⭐
          </motion.div>
        )}
      </div>

      {/* Icon */}
      <motion.div
        whileHover={{ rotate: 10, scale: 1.1 }}
        className="mb-4 inline-block p-3 rounded-lg bg-white/60 dark:bg-white/10 backdrop-blur-sm"
      >
        <Icon className="h-6 w-6" />
      </motion.div>

      {/* Content */}
      <h3 className="text-lg font-display font-bold mb-2 group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2 group-hover:text-foreground/80 transition-colors">
        {description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-white/20">
        <span className="text-xs font-mono font-semibold uppercase tracking-widest opacity-60">
          {category}
        </span>
        <motion.div
          whileHover={{ x: 3 }}
          className="flex items-center gap-1 text-primary opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer"
        >
          <Zap className="h-3.5 w-3.5" />
          <span className="text-xs font-semibold">Launch</span>
        </motion.div>
      </div>
    </motion.div>
  );
}
