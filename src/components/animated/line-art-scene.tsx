"use client";

import { motion } from "framer-motion";

const paths = [
  { d: "M120 280 C120 220, 160 180, 200 190 C240 200, 260 240, 250 290", delay: 0 },
  { d: "M160 190 C150 150, 180 120, 210 130", delay: 0.2 },
  { d: "M200 190 C210 150, 240 120, 270 135", delay: 0.3 },
  { d: "M250 290 C280 270, 310 290, 300 320", delay: 0.5 },
  { d: "M80 200 C60 170, 70 140, 100 130 C110 160, 100 180, 80 200", delay: 0.4 },
  { d: "M320 210 C340 180, 370 190, 360 220", delay: 0.6 },
  { d: "M60 320 C90 300, 120 310, 140 340", delay: 0.7 },
  { d: "M340 320 C310 300, 280 310, 260 340", delay: 0.8 },
];

export function LineArtScene() {
  return (
    <div className="relative aspect-square w-full max-w-lg" aria-hidden>
      <div className="absolute inset-0 rounded-none border-2 border-foreground bg-gradient-to-br from-pink-soft/60 via-orange-soft/40 to-cream dark:from-pink-soft/20 dark:via-orange-soft/10 dark:to-card" />

      <svg viewBox="0 0 400 400" className="relative h-full w-full p-6">
        <motion.circle
          cx="200"
          cy="200"
          r="150"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-foreground/20"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        {paths.map((path, i) => (
          <motion.path
            key={i}
            d={path.d}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="text-brown-dark dark:text-foreground"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.8, delay: path.delay, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}

        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, type: "spring", stiffness: 200 }}
        >
          <ellipse cx="185" cy="215" rx="6" ry="8" fill="#2a1f1a" className="dark:fill-foreground" />
          <ellipse cx="225" cy="215" rx="6" ry="8" fill="#2a1f1a" className="dark:fill-foreground" />
          <ellipse cx="205" cy="235" rx="8" ry="5" fill="#ff6b95" />
        </motion.g>

        {[...Array(6)].map((_, i) => (
          <motion.g
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.5, y: 0 }}
            transition={{ delay: 1.2 + i * 0.1 }}
            transform={`translate(${60 + i * 55}, ${60 + (i % 2) * 30}) rotate(${-20 + i * 15})`}
          >
            <ellipse cx="12" cy="18" rx="8" ry="7" fill="#ff8fab" opacity="0.7" />
            <ellipse cx="5" cy="8" rx="3.5" ry="4" fill="#ffab73" />
            <ellipse cx="12" cy="4" rx="3.5" ry="4" fill="#ffab73" />
            <ellipse cx="19" cy="4" rx="3.5" ry="4" fill="#ffc2d4" />
            <ellipse cx="24" cy="10" rx="3.5" ry="4" fill="#ff8fab" />
          </motion.g>
        ))}
      </svg>

      <motion.div
        className="absolute -right-4 -top-4 border-2 border-foreground bg-orange px-4 py-2 font-mono text-[0.65rem] uppercase tracking-widest text-brown-dark"
        initial={{ rotate: 8, opacity: 0 }}
        animate={{ rotate: 3, opacity: 1 }}
        transition={{ delay: 1.4, type: "spring" }}
      >
        Est. 2025
      </motion.div>

      <motion.div
        className="absolute -bottom-4 -left-4 border-2 border-foreground bg-pink-hot px-4 py-2 font-mono text-[0.65rem] uppercase tracking-widest text-white"
        animate={{ rotate: [-2, 2, -2] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        15+ chapters
      </motion.div>
    </div>
  );
}
