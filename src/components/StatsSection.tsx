import { motion } from "framer-motion";

const stats = [
  { value: "10M+", label: "Files Converted" },
  { value: "50+", label: "Formats Supported" },
  { value: "99.9%", label: "Uptime" },
  { value: "<3s", label: "Avg. Speed" },
];

export function StatsSection() {
  return (
    <section className="py-16 border-y bg-card/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
