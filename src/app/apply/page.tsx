import type { Metadata } from "next";
import { ChapterApplication } from "@/components/chapter-application";

export const metadata: Metadata = {
  title: "Apply to start a chapter",
  description: "Tell PawsForCause about your school, your founding team, and the animal-welfare need you want to address.",
};

export default function ApplyPage() {
  return <ChapterApplication />;
}
