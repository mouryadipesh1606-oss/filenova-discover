import {
  FileText,
  Image,
  Presentation,
  FileSpreadsheet,
  FileArchive,
  FileAudio,
  type LucideIcon,
} from "lucide-react";

export interface ConversionTool {
  id: string;
  from: string;
  to: string;
  label: string;
  description: string;
  icon: LucideIcon;
  acceptTypes: string;
}

export const conversionTools: ConversionTool[] = [
  { id: "pdf-to-png", from: "PDF", to: "PNG", label: "PDF to PNG", description: "Convert PDF pages to high-quality PNG images", icon: Image, acceptTypes: ".pdf" },
  { id: "png-to-pdf", from: "PNG", to: "PDF", label: "PNG to PDF", description: "Combine PNG images into a single PDF document", icon: FileText, acceptTypes: ".png" },
  { id: "ppt-to-pdf", from: "PPT", to: "PDF", label: "PPT to PDF", description: "Convert PowerPoint presentations to PDF format", icon: FileText, acceptTypes: ".ppt,.pptx" },
  { id: "pdf-to-ppt", from: "PDF", to: "PPT", label: "PDF to PPT", description: "Transform PDF files into editable presentations", icon: Presentation, acceptTypes: ".pdf" },
  { id: "jpg-to-pdf", from: "JPG", to: "PDF", label: "JPG to PDF", description: "Convert JPEG images into PDF documents", icon: FileText, acceptTypes: ".jpg,.jpeg" },
  { id: "pdf-to-jpg", from: "PDF", to: "JPG", label: "PDF to JPG", description: "Extract PDF pages as JPEG images", icon: Image, acceptTypes: ".pdf" },
  { id: "excel-to-pdf", from: "Excel", to: "PDF", label: "Excel to PDF", description: "Convert spreadsheets to portable PDF format", icon: FileText, acceptTypes: ".xls,.xlsx" },
  { id: "pdf-to-word", from: "PDF", to: "Word", label: "PDF to Word", description: "Convert PDF documents to editable Word files", icon: FileText, acceptTypes: ".pdf" },
  { id: "word-to-pdf", from: "Word", to: "PDF", label: "Word to PDF", description: "Convert Word documents to PDF format", icon: FileText, acceptTypes: ".doc,.docx" },
  { id: "png-to-jpg", from: "PNG", to: "JPG", label: "PNG to JPG", description: "Convert PNG images to compressed JPEG format", icon: Image, acceptTypes: ".png" },
  { id: "svg-to-png", from: "SVG", to: "PNG", label: "SVG to PNG", description: "Rasterize SVG vector graphics to PNG images", icon: Image, acceptTypes: ".svg" },
  { id: "compress-pdf", from: "PDF", to: "PDF", label: "Compress PDF", description: "Reduce PDF file size without losing quality", icon: FileArchive, acceptTypes: ".pdf" },
];

export function getToolById(id: string) {
  return conversionTools.find((t) => t.id === id);
}

export function detectConversions(fileName: string): ConversionTool[] {
  const ext = fileName.split(".").pop()?.toLowerCase() || "";
  return conversionTools.filter((t) => t.acceptTypes.includes(`.${ext}`));
}
