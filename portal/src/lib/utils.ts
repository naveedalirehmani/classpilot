// import html2pdf from "html2pdf.js"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function generateLessonPlanPDF(
  element: HTMLElement,
  filename: string = "lesson-plan.pdf"
): Promise<void> {
  // const opt = {
  //   margin: [10, 10, 10, 10],
  //   filename: filename,
  //   image: { type: "jpeg", quality: 0.98 },
  //   html2canvas: { scale: 2, useCORS: true },
  //   jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  //   pagebreak: { mode: ["avoid-all", 'css', 'legacy'] }
  // }

  // await html2pdf().set(opt).from(element).save()
}

export function createPDFFilename(lessonPlan: any): string {
  const title = lessonPlan?.title || "Lesson Plan"
  const sanitizedTitle = title.replace(/[^a-z0-9]/gi, "_").toLowerCase()
  return `${sanitizedTitle}.pdf`
}
