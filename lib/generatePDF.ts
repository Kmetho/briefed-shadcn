import jsPDF from "jspdf";
import { type Brief } from "./supabase/briefs";

// ─── Colour tokens (matching globals.css) ────────────────────────────────────
const C = {
  primary: [120, 58, 210] as [number, number, number],
  foreground: [10, 10, 10] as [number, number, number],
  muted: [90, 90, 90] as [number, number, number],
  border: [220, 220, 220] as [number, number, number],
  background: [255, 255, 255] as [number, number, number],
  mutedBg: [247, 247, 247] as [number, number, number],
};

// ─── Layout constants ─────────────────────────────────────────────────────────
const PAGE_W = 210;
const PAGE_H = 297;
const MARGIN = 20;
const CONTENT_W = PAGE_W - MARGIN * 2;

// ─── Helpers ──────────────────────────────────────────────────────────────────
function setColor(
  doc: jsPDF,
  color: [number, number, number],
  target: "text" | "fill" | "draw" = "text",
) {
  if (target === "text") doc.setTextColor(...color);
  if (target === "fill") doc.setFillColor(...color);
  if (target === "draw") doc.setDrawColor(...color);
}

function addPageIfNeeded(doc: jsPDF, y: number, needed = 30): number {
  if (y + needed > PAGE_H - 20) {
    doc.addPage();
    return MARGIN + 10;
  }
  return y;
}

function sectionHeader(doc: jsPDF, label: string, y: number): number {
  y = addPageIfNeeded(doc, y, 20);

  // Left accent bar
  setColor(doc, C.primary, "fill");
  doc.rect(MARGIN, y - 4, 3, 10, "F");

  // Label
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  setColor(doc, C.primary);
  doc.text(label.toUpperCase(), MARGIN + 7, y + 3);

  // Separator line
  setColor(doc, C.border, "draw");
  doc.setLineWidth(0.3);
  doc.line(MARGIN, y + 6, PAGE_W - MARGIN, y + 6);

  return y + 12;
}

function bodyText(
  doc: jsPDF,
  text: string,
  y: number,
  maxWidth = CONTENT_W,
): number {
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  setColor(doc, C.foreground);
  const lines = doc.splitTextToSize(text, maxWidth);
  lines.forEach((line: string) => {
    y = addPageIfNeeded(doc, y, 8);
    doc.text(line, MARGIN, y);
    y += 5.5;
  });
  return y;
}

function labelValue(
  doc: jsPDF,
  label: string,
  value: string,
  y: number,
): number {
  y = addPageIfNeeded(doc, y, 8);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  setColor(doc, C.muted);
  doc.text(label, MARGIN, y);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  setColor(doc, C.foreground);
  const labelWidth = doc.getTextWidth(label) + 3;
  doc.text(value, MARGIN + labelWidth, y);
  return y + 6;
}

function pill(doc: jsPDF, text: string, x: number, y: number) {
  const textW = doc.getTextWidth(text);
  const padX = 4;
  const padY = 2.5;
  const w = textW + padX * 2;
  const h = 6 + padY;

  setColor(doc, [237, 233, 254], "fill"); // light purple bg
  setColor(doc, C.border, "draw");
  doc.setLineWidth(0.2);
  doc.roundedRect(x, y - 5, w, h, 2, 2, "FD");

  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  setColor(doc, C.primary);
  doc.text(text, x + padX, y);
}

// ─── Main export ──────────────────────────────────────────────────────────────
export function generatePDF(data: Brief) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  let y = MARGIN;

  // ── Cover block ──────────────────────────────────────────────────────────────
  // Thin purple top stripe
  setColor(doc, C.primary, "fill");
  doc.rect(0, 0, PAGE_W, 1.5, "F");

  // "briefed" wordmark
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  setColor(doc, C.primary);
  doc.text("briefed", MARGIN, y + 6);

  // Date top-right
  const dateStr = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  setColor(doc, C.muted);
  doc.text(dateStr, PAGE_W - MARGIN - doc.getTextWidth(dateStr), y + 6);

  y += 18;

  // Project name — large title
  doc.setFontSize(26);
  doc.setFont("helvetica", "bold");
  setColor(doc, C.foreground);
  const titleLines = doc.splitTextToSize(data.project_name, CONTENT_W - 40);
  titleLines.forEach((line: string) => {
    doc.text(line, MARGIN, y);
    y += 12;
  });

  // Project type pill beside title
  pill(
    doc,
    data.project_type.charAt(0).toUpperCase() + data.project_type.slice(1),
    MARGIN,
    y,
  );
  y += 10;

  // Divider
  setColor(doc, C.border, "draw");
  doc.setLineWidth(0.4);
  doc.line(MARGIN, y, PAGE_W - MARGIN, y);
  y += 10;

  // ── Client Info ───────────────────────────────────────────────────────────────
  y = sectionHeader(doc, "Client Information", y);
  y = labelValue(doc, "Name:", data.client_name, y);
  if (data.client_email) {
    y = labelValue(doc, "Email:", data.client_email, y);
  }
  y += 6;

  // ── Project Goals ─────────────────────────────────────────────────────────────
  y = sectionHeader(doc, "Project Goals", y);
  y = bodyText(doc, data.goals, y);
  y += 6;

  // ── Target Audience ───────────────────────────────────────────────────────────
  if (data.target_audience) {
    y = sectionHeader(doc, "Target Audience", y);
    y = bodyText(doc, data.target_audience, y);
    y += 6;
  }

  // ── Timeline & Budget ─────────────────────────────────────────────────────────
  if (data.timeline || data.budget) {
    y = sectionHeader(doc, "Timeline & Budget", y);

    if (data.timeline && data.budget) {
      // Side-by-side chips
      const halfW = (CONTENT_W - 6) / 2;

      setColor(doc, C.mutedBg, "fill");
      setColor(doc, C.border, "draw");
      doc.setLineWidth(0.3);
      doc.roundedRect(MARGIN, y, halfW, 16, 2, 2, "FD");
      doc.roundedRect(MARGIN + halfW + 6, y, halfW, 16, 2, 2, "FD");

      doc.setFontSize(8);
      doc.setFont("helvetica", "bold");
      setColor(doc, C.muted);
      doc.text("TIMELINE", MARGIN + 4, y + 5.5);
      doc.text("BUDGET", MARGIN + halfW + 10, y + 5.5);

      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      setColor(doc, C.foreground);
      doc.text(data.timeline, MARGIN + 4, y + 12);
      doc.text(data.budget, MARGIN + halfW + 10, y + 12);

      y += 22;
    } else {
      if (data.timeline) y = labelValue(doc, "Timeline:", data.timeline, y);
      if (data.budget) y = labelValue(doc, "Budget:", data.budget, y);
      y += 6;
    }
  }

  // ── Additional Notes ──────────────────────────────────────────────────────────
  if (data.additional_notes) {
    y = addPageIfNeeded(doc, y, 40);
    y = sectionHeader(doc, "Additional Notes", y);
    y = bodyText(doc, data.additional_notes, y);
  }

  // ── Footer on every page ──────────────────────────────────────────────────────
  const totalPages = (doc.internal as any).pages.length - 1;
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);

    // Bottom thin stripe
    setColor(doc, C.mutedBg, "fill");
    doc.rect(0, PAGE_H - 10, PAGE_W, 10, "F");

    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    setColor(doc, C.muted);
    doc.text("Generated by briefed", MARGIN, PAGE_H - 4);

    const pageLabel = `Page ${i} of ${totalPages}`;
    doc.text(
      pageLabel,
      PAGE_W - MARGIN - doc.getTextWidth(pageLabel),
      PAGE_H - 4,
    );
  }

  doc.save(`${data.project_name.replace(/\s+/g, "_")}_brief.pdf`);
}
