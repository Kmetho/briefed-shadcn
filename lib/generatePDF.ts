import jsPDF from "jspdf";
import { type Brief } from "./supabase/briefs";

// colours matching global theme
const C = {
  primary: [120, 58, 210] as [number, number, number],
  foreground: [10, 10, 10] as [number, number, number],
  muted: [90, 90, 90] as [number, number, number],
  border: [220, 220, 220] as [number, number, number],
  background: [255, 255, 255] as [number, number, number],
  mutedBg: [247, 247, 247] as [number, number, number],
}; 

// layout consts
const PAGE_W = 210;
const PAGE_H = 297;
const MARGIN = 20;
const CONTENT_W = PAGE_W - MARGIN * 2;
// layout consts - cards
const CARD_PAD = 6;
const CARD_RADIUS = 3;
const CARD_INNER_W = CONTENT_W - CARD_PAD * 2;

// img helpers
// fetch an img url and return base64 and real dimensions
async function loadImage(
  url: string,
): Promise<{ base64: string; width: number; height: number } | null> {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const base64 = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });

    // load into an Image element to get real pixel dimensions
    const dims = await new Promise<{ width: number; height: number }>(
      (resolve) => {
        const img = new Image();
        img.onload = () =>
          resolve({ width: img.naturalWidth, height: img.naturalHeight });
        img.src = base64;
      },
    );

    return { base64, width: dims.width, height: dims.height };
  } catch (error) {
    console.error("Failed to load image:", error);
    return null;
  }
}

// helpers
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

// draw a card bg and call before rendering content inside it
function drawCard(doc: jsPDF, x: number, y: number, w: number, h: number) {
  setColor(doc, C.background, "fill");
  setColor(doc, C.border, "draw");
  doc.setLineWidth(0.3);
  doc.roundedRect(x, y, w, h, CARD_RADIUS, CARD_RADIUS, "FD");
}

// mesuring text block line length without rendering
function measureTextHeight(doc: jsPDF, text: string, maxWidth: number): number {
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const lines = doc.splitTextToSize(text, maxWidth);
  return lines.length * 5.5;
}

// card header
function cardHeader(doc: jsPDF, label: string, x: number, y: number): number {
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  setColor(doc, C.muted);
  doc.text(label.toUpperCase(), x, y);
  return y + 7;
}

function bodyText(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  maxWidth = CARD_INNER_W,
): number {
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  setColor(doc, C.foreground);
  const lines = doc.splitTextToSize(text, maxWidth);
  lines.forEach((line: string) => {
    doc.text(line, x, y);
    y += 5.5;
  });
  return y;
}

function labelValue(
  doc: jsPDF,
  label: string,
  value: string,
  x: number,
  y: number,
): number {
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  setColor(doc, C.muted);
  doc.text(label, x, y);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  setColor(doc, C.foreground);
  doc.text(value, x, y + 5);
  return y + 12;
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

// main export
export async function generatePDF(data: Brief) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  let y = MARGIN;

  // cover block
  setColor(doc, C.primary, "fill");
  doc.rect(0, 0, PAGE_W, 1.5, "F");

  // "briefed" wordmark
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  setColor(doc, C.primary);
  doc.text("briefed", MARGIN, y + 6);

  // date
  const dateStr = new Date(data.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  y += 18;

  // project type pill
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  const projectType =
    data.project_type.charAt(0).toUpperCase() + data.project_type.slice(1);
  pill(doc, projectType, MARGIN, y);
  // date next to pill
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  setColor(doc, C.muted);
  const pillW = doc.getTextWidth(projectType) + 12;
  doc.text(dateStr, MARGIN + pillW + 4, y);
  y += 14;

  // project name
  doc.setFontSize(26);
  doc.setFont("helvetica", "bold");
  setColor(doc, C.foreground);
  const titleLines = doc.splitTextToSize(data.project_name, CONTENT_W);
  titleLines.forEach((line: string) => {
    doc.text(line, MARGIN, y);
    y += 10;
  });

  // project brief by
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  setColor(doc, C.muted);
  doc.text("Project brief by ", MARGIN, y);
  const prefixW = doc.getTextWidth("Project brief by ");
  doc.setFont("helvetica", "bold");
  setColor(doc, C.foreground);
  doc.text(data.client_name, MARGIN + prefixW, y);
  y += 10;

  // divider
  setColor(doc, C.border, "draw");
  doc.setLineWidth(0.4);
  doc.line(MARGIN, y, PAGE_W - MARGIN, y);
  y += 10;

  // client info card
  {
    const cardH = data.client_email ? 32 : 24;
    y = addPageIfNeeded(doc, y, cardH + 4);
    drawCard(doc, MARGIN, y, CONTENT_W, cardH);

    const cx = MARGIN + CARD_PAD;
    let cy = y + CARD_PAD;

    cy = cardHeader(doc, "Client information", cx, cy + 3);

    // name & email columns
    const colW = CARD_INNER_W / 2;
    labelValue(doc, "Name", data.client_name, cx, cy);
    if (data.client_email) {
      labelValue(doc, "Email", data.client_email, cx + colW, cy);
    }

    y += cardH + 6;
  }

  // goals card
  {
    const textH = measureTextHeight(doc, data.goals, CARD_INNER_W);
    const cardH = 8 + textH + CARD_PAD * 2;
    y = addPageIfNeeded(doc, y, cardH + 4);
    drawCard(doc, MARGIN, y, CONTENT_W, cardH);

    const cx = MARGIN + CARD_PAD;
    let cy = y + CARD_PAD;

    cy = cardHeader(doc, "Project goals", cx, cy + 3);
    bodyText(doc, data.goals, cx, cy);

    y += cardH + 6;
  }

  // target audience
  if (data.target_audience) {
    const textH = measureTextHeight(doc, data.target_audience, CARD_INNER_W);
    const cardH = 8 + textH + CARD_PAD * 2;
    y = addPageIfNeeded(doc, y, cardH + 4);
    drawCard(doc, MARGIN, y, CONTENT_W, cardH);

    const cx = MARGIN + CARD_PAD;
    let cy = y + CARD_PAD;

    cy = cardHeader(doc, "Target audience", cx, cy + 3);
    bodyText(doc, data.target_audience, cx, cy);

    y += cardH + 6;
  }

  // timeline & budget cards
  if (data.timeline || data.budget) {
    const cardH = 28;
    y = addPageIfNeeded(doc, y, cardH + 4);

    if (data.timeline && data.budget) {
      const halfW = (CONTENT_W - 4) / 2;
      const maxValW = halfW - CARD_PAD * 2;

      // timeline card
      drawCard(doc, MARGIN, y, halfW, cardH);
      let cx = MARGIN + CARD_PAD;
      let cy = y + CARD_PAD;
      cardHeader(doc, "Timeline", cx, cy + 3);
      const tlFontSize = data.timeline.length > 20 ? 11 : 14;
      doc.setFontSize(tlFontSize);
      doc.setFont("helvetica", "bold");
      setColor(doc, C.foreground);
      const tlLines = doc.splitTextToSize(data.timeline, maxValW);
      tlLines.forEach((line: string, idx: number) => {
        doc.text(line, cx, cy + 14 + idx * 5);
      });

      // budget card
      drawCard(doc, MARGIN + halfW + 4, y, halfW, cardH);
      cx = MARGIN + halfW + 4 + CARD_PAD;
      cy = y + CARD_PAD;
      cardHeader(doc, "Budget", cx, cy + 3);
      const bgFontSize = data.budget.length > 20 ? 11 : 14;
      doc.setFontSize(bgFontSize);
      doc.setFont("helvetica", "bold");
      setColor(doc, C.foreground);
      const bgLines = doc.splitTextToSize(data.budget, maxValW);
      bgLines.forEach((line: string, idx: number) => {
        doc.text(line, cx, cy + 14 + idx * 5);
      });
    } else {
      // if only one
      drawCard(doc, MARGIN, y, CONTENT_W, cardH);
      const cx = MARGIN + CARD_PAD;
      const cy = y + CARD_PAD;
      const label = data.timeline ? "Timeline" : "Budget";
      const value = data.timeline ?? data.budget ?? "";
      cardHeader(doc, label, cx, cy + 3);
      const fontSize = value.length > 20 ? 11 : 14;
      doc.setFontSize(fontSize);
      doc.setFont("helvetica", "bold");
      setColor(doc, C.foreground);
      const valLines = doc.splitTextToSize(value, CARD_INNER_W);
      valLines.forEach((line: string, idx: number) => {
        doc.text(line, cx, cy + 14 + idx * 5);
      });
    }

    y += cardH + 6;
  }

  // additional notes
  if (data.additional_notes) {
    const textH = measureTextHeight(doc, data.additional_notes, CARD_INNER_W);
    const cardH = 8 + textH + CARD_PAD * 2;
    y = addPageIfNeeded(doc, y, cardH + 4);
    drawCard(doc, MARGIN, y, CONTENT_W, cardH);

    const cx = MARGIN + CARD_PAD;
    let cy = y + CARD_PAD;

    cy = cardHeader(doc, "Additional Notes", cx, cy + 3);
    bodyText(doc, data.additional_notes, cx, cy);

    y += cardH + 6;
  }

  // moodboard
  if (data.moodboard_urls && data.moodboard_urls.length > 0) {
    // loading imgs first
    const images = (
      await Promise.all(data.moodboard_urls.map((url) => loadImage(url)))
    ).filter((img) => img !== null);

    if (images.length > 0) {
      const GAP = 4;
      const COLS = images.length === 1 ? 1 : images.length === 2 ? 2 : 3;
      const GRID_W = CARD_INNER_W;
      const CELL_W = (GRID_W - GAP * (COLS - 1)) / COLS;
      const MAX_CELL_H = 55;

      // calculate total grid height
      let totalGridH = 0;
      for (let i = 0; i < images.length; i += COLS) {
        const row = images.slice(i, i + COLS);
        const rowH = Math.max(
          ...row.map((img) => {
            const h = CELL_W / (img.width / img.height);
            return Math.min(h, MAX_CELL_H);
          }),
        );
        totalGridH += rowH + (i > 0 ? GAP : 0);
      }

      const cardH = 12 + totalGridH + CARD_PAD * 2;

      // check if fits on page and prepare the alternative if not
      const fitsOnPage = y + cardH + 4 < PAGE_H - 20;

      if (fitsOnPage) {
        y = addPageIfNeeded(doc, y, cardH + 4);
        drawCard(doc, MARGIN, y, CONTENT_W, cardH);
      } else {
        y = addPageIfNeeded(doc, y, 30);
      }
      const cx = MARGIN + CARD_PAD;
      let cy = y + CARD_PAD;
      cy = cardHeader(doc, "Moodboard", cx, cy + 3);

      for (let i = 0; i < images.length; i += COLS) {
        const row = images.slice(i, i + COLS);
        // calculate img's height based on real aspect ratio
        const rowHeights = row.map((img) => {
          const aspect = img.width / img.height;
          const h = CELL_W / aspect;
          return Math.min(h, MAX_CELL_H); // cap at max height
        });
        const rowH = Math.max(...rowHeights); // tallest image sets row height

        if (!fitsOnPage && i > 0) {
          cy = addPageIfNeeded(doc, cy, rowH + GAP);
        }

        row.forEach((img, j) => {
          const x = cx + j * (CELL_W + GAP);
          const aspect = img.width / img.height;

          // fit img proportionally within the cell
          let drawW = CELL_W;
          let drawH = CELL_W / aspect;
          if (drawH > MAX_CELL_H) {
            drawH = MAX_CELL_H;
            drawW = MAX_CELL_H * aspect;
          }

          // center the img within the cell space
          const offsetX = (CELL_W - drawW) / 2;
          const offsetY = (rowH - drawH) / 2;

          // draw the img
          doc.addImage(
            img.base64,
            "JPEG",
            x + offsetX,
            cy + offsetY,
            drawW,
            drawH,
          );
        });

        cy += rowH + GAP;
      }

      y = cy + CARD_PAD;
    }
  }

  // footer
  const totalPages = (doc.internal as any).pages.length - 1;
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);

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
