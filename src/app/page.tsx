import type { Metadata } from "next";
import { StorybookHome } from "@/components/sections/storybook-home";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return <StorybookHome />;
}
