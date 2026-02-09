import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, ArrowRight, Download, CheckCircle2, FileText, X, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getToolById, detectConversions, type ConversionTool } from "@/lib/converters";

type Stage = "upload" | "select" | "converting" | "done";

const ConvertPage = () => {
  const { toolId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const preselectedTool = toolId ? getToolById(toolId) : null;

  const [file, setFile] = useState<File | null>(null);
  const [stage, setStage] = useState<Stage>("upload");
  const [selectedTool, setSelectedTool] = useState<ConversionTool | null>(preselectedTool || null);
  const [availableTools, setAvailableTools] = useState<ConversionTool[]>([]);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Handle file from navigation state
  useEffect(() => {
    const navFile = (location.state as any)?.file as File | undefined;
    if (navFile) {
      handleFile(navFile);
    }
  }, [location.state]);

  const handleFile = useCallback(
    (f: File) => {
      setFile(f);
      if (preselectedTool) {
        setSelectedTool(preselectedTool);
        setStage("select");
      } else {
        const tools = detectConversions(f.name);
        setAvailableTools(tools);
        setStage("select");
      }
    },
    [preselectedTool]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const f = e.dataTransfer.files[0];
      if (f) handleFile(f);
    },
    [handleFile]
  );

  const handleConvert = useCallback(() => {
    setStage("converting");
    setProgress(0);
    // Simulated conversion
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setStage("done");
          return 100;
        }
        return p + Math.random() * 15 + 5;
      });
    }, 300);
  }, []);

  const reset = () => {
    setFile(null);
    setStage("upload");
    setSelectedTool(preselectedTool || null);
    setAvailableTools([]);
    setProgress(0);
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1048576).toFixed(1) + " MB";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 md:px-6 max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {preselectedTool ? preselectedTool.label : "Convert Your File"}
            </h1>
            <p className="text-muted-foreground">
              {preselectedTool ? preselectedTool.description : "Upload a file and choose your desired format"}
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {/* Upload stage */}
            {stage === "upload" && (
              <motion.div key="upload" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }}>
                <label
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-16 cursor-pointer transition-all duration-300 ${
                    isDragging ? "border-primary bg-primary/5 scale-[1.02]" : "border-border hover:border-primary/40 hover:bg-card/80"
                  }`}
                >
                  <input ref={inputRef} type="file" className="hidden" accept={preselectedTool?.acceptTypes} onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
                  <div className="gradient-bg rounded-2xl p-4 mb-5 shadow-lg shadow-primary/20">
                    <Upload className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <p className="text-lg font-semibold mb-1">Drop your file here or <span className="text-primary">browse</span></p>
                  <p className="text-sm text-muted-foreground">{preselectedTool ? `Accepts ${preselectedTool.acceptTypes}` : "PDF, PNG, JPG, PPT, DOC, XLS"}</p>
                </label>
              </motion.div>
            )}

            {/* Select format stage */}
            {stage === "select" && file && (
              <motion.div key="select" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} className="space-y-6">
                {/* File info */}
                <div className="glass rounded-xl p-5 flex items-center gap-4">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{file.name}</p>
                    <p className="text-sm text-muted-foreground">{formatSize(file.size)}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={reset}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* Format options or direct convert */}
                {preselectedTool ? (
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-3 mb-6 text-lg font-semibold">
                      <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary">{preselectedTool.from}</span>
                      <ArrowRight className="h-5 w-5 text-muted-foreground" />
                      <span className="px-3 py-1 rounded-lg bg-accent/10 text-accent">{preselectedTool.to}</span>
                    </div>
                    <Button size="lg" className="gradient-bg text-primary-foreground border-0 px-10 gap-2" onClick={handleConvert}>
                      Convert Now <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <>
                    <p className="font-semibold">Choose conversion format:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {availableTools.map((tool) => (
                        <button
                          key={tool.id}
                          onClick={() => { setSelectedTool(tool); }}
                          className={`glass-hover rounded-xl p-4 text-left transition-all ${
                            selectedTool?.id === tool.id ? "ring-2 ring-primary border-primary/30" : ""
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-primary/10 text-primary">{tool.from}</span>
                            <ArrowRight className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-accent/10 text-accent">{tool.to}</span>
                          </div>
                          <p className="text-sm font-medium">{tool.label}</p>
                        </button>
                      ))}
                    </div>
                    {selectedTool && (
                      <div className="text-center">
                        <Button size="lg" className="gradient-bg text-primary-foreground border-0 px-10 gap-2" onClick={handleConvert}>
                          Convert Now <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                    {availableTools.length === 0 && (
                      <p className="text-center text-muted-foreground">No conversion tools available for this file type.</p>
                    )}
                  </>
                )}
              </motion.div>
            )}

            {/* Converting stage */}
            {stage === "converting" && (
              <motion.div key="converting" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} className="glass rounded-2xl p-10 text-center space-y-6">
                <div className="gradient-bg rounded-2xl p-4 inline-block shadow-lg shadow-primary/20">
                  <RotateCcw className="h-8 w-8 text-primary-foreground animate-spin" />
                </div>
                <div>
                  <p className="text-lg font-semibold mb-2">Converting your file...</p>
                  <p className="text-sm text-muted-foreground mb-4">{file?.name}</p>
                  <Progress value={Math.min(progress, 100)} className="h-2 max-w-sm mx-auto" />
                  <p className="text-xs text-muted-foreground mt-2">{Math.min(Math.round(progress), 100)}%</p>
                </div>
              </motion.div>
            )}

            {/* Done stage */}
            {stage === "done" && (
              <motion.div key="done" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} className="glass rounded-2xl p-10 text-center space-y-6">
                <div className="inline-block rounded-full bg-green-500/10 p-4">
                  <CheckCircle2 className="h-10 w-10 text-green-500" />
                </div>
                <div>
                  <p className="text-xl font-semibold mb-1">Conversion Complete!</p>
                  <p className="text-sm text-muted-foreground">
                    {file?.name} → {selectedTool?.to} format
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Button size="lg" className="gradient-bg text-primary-foreground border-0 gap-2">
                    <Download className="h-4 w-4" /> Download File
                  </Button>
                  <Button variant="outline" size="lg" onClick={reset} className="gap-2">
                    <RotateCcw className="h-4 w-4" /> Convert Another
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ConvertPage;
