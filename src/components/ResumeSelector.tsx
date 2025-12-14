import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Download,
  ExternalLink,
  ZoomIn,
  ZoomOut,
  Maximize2,
  FileText,
  Cloud,
  Database,
  Brain,
  ChevronLeft,
} from "lucide-react";
import { Button } from "./ui/button";

interface ResumeOption {
  id: string;
  title: string;
  role: string;
  icon: React.ElementType;
  color: string;
  srcPath: string; // LOCAL PDF PATH
}

const resumeOptions: ResumeOption[] = [
  {
    id: "devops",
    title: "Thangella_AWS_DevOps_Resume",
    role: "DevOps / Cloud / SRE",
    icon: Cloud,
    color: "from-blue-500 to-cyan-500",
    srcPath:"/Thangella_AWS_DevOps_Resume.pdf",
  },
  {
    id: "data",
    title: "Thangella_Data_Analyst_Resume",
    role: "Data Analytics / BI",
    icon: Database,
    color: "from-green-500 to-emerald-500",
    srcPath: "/Thangella_Data_Analyst_Resume.pdf",
  },
  {
    id: "ai",
    title: "Thangella_Promt Engineer_Resume",
    role: "AI / ML / Automation",
    icon: Brain,
    color: "from-purple-500 to-pink-500",
    srcPath: "/Thangella_Promt Engineer_Resume.pdf",
  },
];

interface ResumeSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "view" | "download";
}

const ResumeSelector = ({ isOpen, onClose, mode }: ResumeSelectorProps) => {
  const [selectedResume, setSelectedResume] = useState<ResumeOption | null>(null);
  const [zoom, setZoom] = useState(100);

  const handleZoomIn = () => setZoom(Math.min(zoom + 25, 200));
  const handleZoomOut = () => setZoom(Math.max(zoom - 25, 50));
  const handleResetZoom = () => setZoom(100);

  const handleSelect = (resume: ResumeOption) => {
    if (mode === "download") {
      const link = document.createElement("a");
      link.href = resume.srcPath;
      link.download = `${resume.title}.pdf`;
      link.click();
    } else {
      setSelectedResume(resume);
    }
  };

  const handleBack = () => {
    setSelectedResume(null);
    setZoom(100);
  };

  const handleClose = () => {
    setSelectedResume(null);
    setZoom(100);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-lg p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative flex h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border bg-secondary/50 px-4 py-4">
              <div className="flex items-center gap-3">
                {selectedResume && (
                  <Button variant="ghost" size="icon" onClick={handleBack}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                )}
                <div>
                  <h3 className="font-semibold">
                    {mode === "download"
                      ? "Download Resume"
                      : selectedResume
                      ? selectedResume.title
                      : "Select Resume"}
                  </h3>
                  {!selectedResume && (
                    <p className="text-xs text-muted-foreground">
                      Choose a role-specific resume
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                {selectedResume && (
                  <div className="hidden sm:flex items-center gap-1 rounded-lg border p-1">
                    <Button size="icon" variant="ghost" onClick={handleZoomOut}>
                      <ZoomOut className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center text-sm">{zoom}%</span>
                    <Button size="icon" variant="ghost" onClick={handleZoomIn}>
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={handleResetZoom}>
                      <Maximize2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
                <Button variant="ghost" size="icon" onClick={handleClose}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Content */}
            {!selectedResume ? (
              <div className="flex-1 overflow-y-auto p-6">
                <div className="max-w-2xl mx-auto grid gap-4">
                  <div className="text-center">
                    <FileText className="h-10 w-10 mx-auto text-primary mb-2" />
                    <h4 className="text-lg font-semibold">
                      {mode === "download" ? "Download Resume" : "View Resume"}
                    </h4>
                  </div>

                  {resumeOptions.map((resume, index) => (
                    <motion.button
                      key={resume.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleSelect(resume)}
                      className="relative overflow-hidden rounded-xl border p-4 text-left hover:shadow-lg"
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${resume.color} opacity-10`}
                      />
                      <div className="relative flex items-center gap-3">
                        <div
                          className={`h-12 w-12 rounded-xl flex items-center justify-center bg-gradient-to-r ${resume.color} text-white`}
                        >
                          <resume.icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <h5 className="font-semibold">{resume.title}</h5>
                          <p className="text-xs text-muted-foreground">
                            {resume.role}
                          </p>
                        </div>
                        {mode === "download" ? (
                          <Download className="h-4 w-4" />
                        ) : (
                          <ExternalLink className="h-4 w-4" />
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex-1 overflow-auto bg-muted/30 p-4">
                <div
                  className="mx-auto transition-transform"
                  style={{
                    transform: `scale(${zoom / 100})`,
                    transformOrigin: "top center",
                  }}
                >
                  <iframe
                    src={selectedResume.srcPath}
                    className="h-[800px] w-full max-w-3xl mx-auto rounded-lg border shadow-lg"
                    title={selectedResume.title}
                  />
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResumeSelector;
