"use client";

export function FloatingShapes() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className="shape-drift absolute -left-16 top-24 h-48 w-48 rounded-full bg-pink/30 blur-3xl"
        style={{ opacity: "var(--shape-opacity)" }}
      />
      <div
        className="shape-drift-reverse absolute -right-10 top-1/3 h-56 w-56 rounded-full bg-orange/25 blur-3xl"
        style={{ opacity: "var(--shape-opacity)" }}
      />
      <div
        className="shape-drift absolute bottom-20 left-1/3 h-40 w-40 rounded-full bg-brown-soft/30 blur-3xl"
        style={{ opacity: "var(--shape-opacity)" }}
      />
    </div>
  );
}
