import type { Metadata } from "next";
import { StorybookHome } from "@/components/sections/storybook-home";
import { getPublicNetwork } from "@/lib/public-record";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export const dynamic = "force-dynamic";

export default async function Home() {
  const network = await getPublicNetwork();
  return <StorybookHome network={network} />;
}
