import { motion } from "framer-motion";
import { conversionTools } from "@/lib/converters";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ToolsGridProps {
  showAll?: boolean;
}

export function ToolsGrid({ showAll = false }: ToolsGridProps) {
  const navigate = useNavigate();
  const tools = showAll ? conversionTools : conversionTools.slice(0, 6);

  return (
    <section id="tools" className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Conversion Tools</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Everything you need to transform your documents and images
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool, i) => (
            <motion.button
              key={tool.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              onClick={() => navigate(`/convert/${tool.id}`)}
              className="glass-hover group rounded-xl p-6 text-left"
            >
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-primary/10 p-2.5 text-primary">
                  <tool.icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-primary/10 text-primary">{tool.from}</span>
                    <ArrowRight className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-accent/10 text-accent">{tool.to}</span>
                  </div>
                  <h3 className="font-semibold mb-1">{tool.label}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{tool.description}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {!showAll && (
          <div className="text-center mt-10">
            <Button variant="outline" onClick={() => navigate("/tools")} className="gap-2">
              View All Tools <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
