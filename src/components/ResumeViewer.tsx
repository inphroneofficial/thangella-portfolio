import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, ExternalLink, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import { Button } from "./ui/button";

interface ResumeViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResumeViewer = ({ isOpen, onClose }: ResumeViewerProps) => {
  const [zoom, setZoom] = useState(100);
  const resumeUrl = "https://drive.google.com/file/d/1z6xKlz6VympQ6NlchXRD75xh13swQSJe/preview";
  const downloadUrl = "https://drive.google.com/uc?export=download&id=1z6xKlz6VympQ6NlchXRD75xh13swQSJe";

  const handleZoomIn = () => setZoom(Math.min(zoom + 25, 200));
  const handleZoomOut = () => setZoom(Math.max(zoom - 25, 50));
  const handleResetZoom = () => setZoom(100);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative flex h-[90vh] w-[90vw] max-w-5xl flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border bg-secondary/50 px-6 py-4">
              <div className="flex items-center gap-4">
                <h3 className="text-lg font-semibold">Resume - Gadidamalla Thangella</h3>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  PDF Viewer
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                {/* Zoom Controls */}
                <div className="flex items-center gap-1 rounded-lg border border-border bg-background p-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleZoomOut}>
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center text-sm font-medium">{zoom}%</span>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleZoomIn}>
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleResetZoom}>
                    <Maximize2 className="h-4 w-4" />
                  </Button>
                </div>

                {/* Actions */}
                <Button variant="outline" size="sm" asChild>
                  <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
                    <Download className="h-4 w-4" />
                    Download
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://drive.google.com/file/d/1z6xKlz6VympQ6NlchXRD75xh13swQSJe/view" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                    Open in Drive
                  </a>
                </Button>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* PDF Viewer */}
            <div className="flex-1 overflow-auto bg-muted/30 p-4">
              <div
                className="mx-auto transition-transform duration-300"
                style={{ transform: `scale(${zoom / 100})`, transformOrigin: "top center" }}
              >
                <iframe
                  src={resumeUrl}
                  className="h-[800px] w-full max-w-3xl rounded-lg border border-border bg-card shadow-lg"
                  title="Resume"
                  allow="autoplay"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResumeViewer;
