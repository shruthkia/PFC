import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { CHAPTER_FORM_URL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Apply to start a chapter",
  description: "Open the approved PawsForCause chapter interest form.",
  robots: { index: false, follow: true },
};

export default function ApplyPage() {
  redirect(CHAPTER_FORM_URL);
}
