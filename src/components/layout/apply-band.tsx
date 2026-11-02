import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ApplyBand({
  title = "If this sounds like your school, send the form",
  body = "HQ reads every interest form. If you are a fit, you get the registration pack, not a vague 'thanks for applying' email that goes nowhere.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="border-t-2 border-cocoa bg-rose px-4 py-16 text-white sm:px-8">
      <div className="mx-auto flex max-w-[1100px] flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-xl">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">{title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-white/80">{body}</p>
        </div>
        <Button asChild size="lg" className="border-white bg-white text-rose shadow-none hover:bg-cream">
          <Link href="/apply">
            Start your application
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
        </Button>
      </div>
    </section>
  );
}
