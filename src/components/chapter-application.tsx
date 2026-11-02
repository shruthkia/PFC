"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Heart, ShieldCheck } from "lucide-react";

const steps = ["About you", "Your school", "Your idea", "Review"];

export function ChapterApplication() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step < steps.length - 1) setStep((value) => value + 1);
    else setSubmitted(true);
  }

  if (submitted) {
    return (
      <section className="paper-grid min-h-[calc(100vh-4rem)] px-5 pb-24 pt-32 sm:px-10">
        <div className="sticker-card mx-auto max-w-2xl bg-white p-8 text-center sm:p-12">
          <span className="mx-auto grid h-20 w-20 place-items-center rounded-full border-2 border-cocoa bg-mint text-cocoa">
            <Heart className="h-9 w-9 fill-rose text-rose" aria-hidden />
          </span>
          <p className="mt-6 font-hand text-2xl font-bold text-rose">Application received</p>
          <h1 className="mt-2 font-display text-4xl font-black text-cocoa sm:text-5xl">You took the first step.</h1>
          <p className="mx-auto mt-5 max-w-lg leading-7 text-ink/65">
            This prototype does not send or store personal data. In production, the chapter team
            would review your application and email the next steps.
          </p>
          <Link href="/" className="button-primary mt-8">Return home</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="paper-grid min-h-[calc(100vh-4rem)] px-5 pb-24 pt-28 sm:px-10">
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-black text-cocoa/65 hover:text-rose">
          <ArrowLeft className="h-4 w-4" aria-hidden /> Back home
        </Link>
        <div className="mt-8 grid gap-8 lg:grid-cols-[.72fr_1.28fr]">
          <aside>
            <p className="eyebrow w-fit">Chapter application</p>
            <h1 className="mt-5 font-display text-4xl font-black tracking-tight text-cocoa">Bring the pack to your school.</h1>
            <p className="mt-4 leading-7 text-ink/65">You do not need a perfect plan. We need an honest one, a faculty advisor, and a reason you are ready to show up.</p>
            <ol className="mt-8 space-y-3">
              {steps.map((item, index) => (
                <li key={item} className={`flex items-center gap-3 text-sm font-black ${index <= step ? "text-cocoa" : "text-cocoa/35"}`} aria-current={index === step ? "step" : undefined}>
                  <span className={`grid h-8 w-8 place-items-center rounded-full border-2 ${index < step ? "border-cocoa bg-mint" : index === step ? "border-cocoa bg-blush" : "border-cocoa/25 bg-white"}`}>
                    {index < step ? <Check className="h-4 w-4" aria-hidden /> : index + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ol>
            <div className="mt-8 flex gap-3 rounded-2xl border border-cocoa/25 bg-white/60 p-4 text-xs leading-5 text-cocoa/65">
              <ShieldCheck className="h-5 w-5 shrink-0 text-sage-dark" aria-hidden />
              <p>We collect only what is needed to review a chapter. Students under 18 should involve a parent or guardian.</p>
            </div>
          </aside>

          <div className="sticker-card bg-white p-6 sm:p-9">
            <div className="flex items-center justify-between border-b border-cocoa/15 pb-5">
              <div>
                <p className="text-xs font-black uppercase tracking-[.16em] text-rose">Step {step + 1} of {steps.length}</p>
                <h2 className="mt-1 font-display text-2xl font-black text-cocoa">{steps[step]}</h2>
              </div>
              <span className="font-hand text-2xl font-bold text-cocoa/50">{Math.round(((step + 1) / steps.length) * 100)}%</span>
            </div>

            <form className="mt-6" onSubmit={submit}>
              {step === 0 && (
                <div className="space-y-5">
                  <FormField label="Full name" hint="Use the name your school knows you by"><input className="form-control" required autoComplete="name" /></FormField>
                  <FormField label="School email address"><input className="form-control" required type="email" autoComplete="email" /></FormField>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <FormField label="Grade"><select required className="form-control"><option value="">Choose</option><option>9th</option><option>10th</option><option>11th</option><option>12th</option></select></FormField>
                    <FormField label="Age"><input className="form-control" required type="number" min="13" max="19" /></FormField>
                  </div>
                </div>
              )}
              {step === 1 && (
                <div className="space-y-5">
                  <FormField label="School name"><input className="form-control" required /></FormField>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <FormField label="City"><input className="form-control" required autoComplete="address-level2" /></FormField>
                    <FormField label="State or region"><input className="form-control" required autoComplete="address-level1" /></FormField>
                  </div>
                  <FormField label="Faculty advisor email" hint="It is okay if you are still confirming"><input className="form-control" type="email" /></FormField>
                </div>
              )}
              {step === 2 && (
                <div className="space-y-5">
                  <FormField label="Why do you want to start a chapter?" hint="A few honest sentences are enough"><textarea className="form-control min-h-32 resize-y" required /></FormField>
                  <FormField label="What is one animal-welfare need in your community?"><textarea className="form-control min-h-28 resize-y" required /></FormField>
                  <FormField label="How many students are interested so far?"><input className="form-control" required type="number" min="1" /></FormField>
                </div>
              )}
              {step === 3 && (
                <div>
                  <div className="rounded-2xl border-2 border-cocoa bg-blush/55 p-5">
                    <h3 className="font-display text-xl font-black text-cocoa">One last check</h3>
                    <ul className="mt-4 space-y-3 text-sm leading-6 text-cocoa/70">
                      <li className="flex gap-2"><Check className="mt-1 h-4 w-4 shrink-0 text-sage-dark" /> Your information is accurate and belongs to you.</li>
                      <li className="flex gap-2"><Check className="mt-1 h-4 w-4 shrink-0 text-sage-dark" /> You understand that applying does not make a chapter official.</li>
                      <li className="flex gap-2"><Check className="mt-1 h-4 w-4 shrink-0 text-sage-dark" /> You will follow school, shelter, and youth-safety rules.</li>
                    </ul>
                  </div>
                  <label className="mt-5 flex cursor-pointer gap-3 text-sm font-bold leading-6 text-cocoa">
                    <input required type="checkbox" className="mt-1 h-5 w-5 accent-[#c94d78]" />
                    <span>I agree to the <Link href="/terms" className="text-rose underline">Terms</Link> and acknowledge the <Link href="/privacy" className="text-rose underline">Privacy Notice</Link>.</span>
                  </label>
                </div>
              )}
              <div className="mt-8 flex items-center justify-between border-t border-cocoa/15 pt-5">
                <button type="button" onClick={() => setStep((value) => Math.max(0, value - 1))} className={`button-paper ${step === 0 ? "invisible" : ""}`}>
                  <ArrowLeft className="h-4 w-4" aria-hidden /> Back
                </button>
                <button type="submit" className="button-primary">
                  {step === steps.length - 1 ? "Submit application" : "Continue"} <ArrowRight className="h-4 w-4" aria-hidden />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function FormField({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-sm font-black text-cocoa">{label}</span>
      {hint && <span className="mt-1 block text-xs text-cocoa/50">{hint}</span>}
      <span className="mt-2 block">{children}</span>
    </label>
  );
}
