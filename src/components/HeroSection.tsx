import { motion } from "framer-motion";
import { Upload, ArrowRight, Shield, Zap, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";

export function HeroSection() {
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) {
        navigate("/convert", { state: { file } });
      }
    },
    [navigate]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        navigate("/convert", { state: { file } });
      }
    },
    [navigate]
  );

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-80 h-80 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Zap className="h-3.5 w-3.5" />
            Lightning-fast file conversion
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
            Convert Your Files{" "}
            <span className="gradient-text">Instantly</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
            PDF, PNG, PPT, Word — transform any file format in seconds. No signup required, 100% secure.
          </p>
        </motion.div>

        {/* Upload area */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <label
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`group relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-12 md:p-16 cursor-pointer transition-all duration-300 ${
              isDragging
                ? "border-primary bg-primary/5 scale-[1.02]"
                : "border-border hover:border-primary/40 hover:bg-card/80"
            }`}
          >
            <input
              type="file"
              className="hidden"
              onChange={handleFileSelect}
            />
            <div className="gradient-bg rounded-2xl p-4 mb-5 shadow-lg shadow-primary/20">
              <Upload className="h-8 w-8 text-primary-foreground" />
            </div>
            <p className="text-lg font-semibold mb-1">
              Drop your file here or{" "}
              <span className="text-primary">browse</span>
            </p>
            <p className="text-sm text-muted-foreground">
              PDF, PNG, JPG, PPT, DOC, XLS — up to 50MB
            </p>
          </label>

          <div className="flex items-center justify-center gap-3 mt-6">
            <Button
              variant="outline"
              onClick={() => navigate("/tools")}
              className="gap-2"
            >
              Browse All Tools <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mt-14 text-sm text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            <span>256-bit encryption</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <span>Files auto-deleted in 1 hour</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-primary" />
            <span>Instant conversion</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
