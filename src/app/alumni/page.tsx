import type { Metadata } from "next";
import { AlumniPortal } from "@/components/alumni-portal";

export const metadata: Metadata = {
  title: "Alumni portal",
  description: "Graduating seniors sign up as mentors or bridge into university animal-welfare circles.",
};

export default function AlumniPage() {
  return <AlumniPortal />;
}
