"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function CatDoodle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 140" className={cn("w-full", className)} fill="none" aria-hidden>
      <motion.path
        d="M40 110 C40 70, 70 48, 100 50 C132 52, 160 74, 158 110"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.path
        d="M70 58 L58 28 L82 50"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
      />
      <motion.path
        d="M128 58 L142 26 L116 50"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
      />
      <circle cx="86" cy="78" r="3.2" fill="currentColor" />
      <circle cx="116" cy="78" r="3.2" fill="currentColor" />
      <path d="M100 86 C97 90, 103 90, 100 86" fill="#ff6b95" />
      <path d="M92 98 Q100 106 108 98" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <motion.path
        d="M158 100 C178 90, 188 110, 176 118"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        className="origin-[158px_100px]"
        animate={{ rotate: [0, 8, -4, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

export function DogDoodle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 140" className={cn("w-full", className)} fill="none" aria-hidden>
      <motion.path
        d="M50 108 C48 70, 78 44, 118 48 C154 52, 176 80, 170 112"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4 }}
      />
      <path d="M78 60 C62 48, 48 70, 70 78" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M148 58 C168 42, 176 68, 154 76" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="104" cy="78" r="3.2" fill="currentColor" />
      <circle cx="132" cy="78" r="3.2" fill="currentColor" />
      <ellipse cx="118" cy="90" rx="7" ry="4.5" fill="#ff8c42" />
      <path d="M108 102 Q118 110 128 102" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <motion.path
        d="M170 100 C196 86, 204 120, 184 126"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        animate={{ rotate: [0, -10, 12, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "170px 100px" }}
      />
    </svg>
  );
}

export function PawTrail({ className }: { className?: string }) {
  const paws = [
    { x: 8, y: 40, r: -18, o: 0.25 },
    { x: 48, y: 18, r: 8, o: 0.4 },
    { x: 92, y: 44, r: -12, o: 0.55 },
    { x: 136, y: 14, r: 16, o: 0.7 },
    { x: 180, y: 38, r: -6, o: 0.9 },
  ];

  return (
    <svg viewBox="0 0 220 80" className={cn("w-full", className)} aria-hidden>
      {paws.map((paw, i) => (
        <motion.g
          key={i}
          transform={`translate(${paw.x} ${paw.y}) rotate(${paw.r})`}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: paw.o, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.12 }}
          fill="currentColor"
        >
          <ellipse cx="12" cy="18" rx="8" ry="6.5" />
          <ellipse cx="3" cy="7" rx="3.4" ry="4.2" />
          <ellipse cx="10" cy="3" rx="3.5" ry="4.3" />
          <ellipse cx="17.5" cy="3.5" rx="3.5" ry="4.3" />
          <ellipse cx="23.5" cy="8" rx="3.4" ry="4.2" />
        </motion.g>
      ))}
    </svg>
  );
}
