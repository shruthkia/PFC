"use client";

import { motion } from "framer-motion";

export function HeroIllustration() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md" aria-hidden>
      <motion.div
        className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-pink-soft via-orange-soft to-cream dark:from-pink-soft/40 dark:via-orange-soft/30 dark:to-cream"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />

      <svg
        viewBox="0 0 400 400"
        className="relative h-full w-full p-8"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.circle
          cx="200"
          cy="200"
          r="120"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-pink/40"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "200px 200px" }}
        />

        <motion.g
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <ellipse cx="200" cy="250" rx="70" ry="55" fill="#8B6F5E" />
          <circle cx="155" cy="195" r="22" fill="#FFB5C5" />
          <circle cx="200" cy="170" r="24" fill="#FFB87A" />
          <circle cx="245" cy="195" r="22" fill="#FFD4DE" />
          <circle cx="270" cy="235" r="18" fill="#C4A882" />
          <ellipse cx="175" cy="220" rx="8" ry="10" fill="#3D2E2A" className="eye-blink" />
          <ellipse cx="225" cy="220" rx="8" ry="10" fill="#3D2E2A" className="eye-blink" />
          <ellipse cx="200" cy="245" rx="10" ry="7" fill="#E8899E" />
          <path
            d="M185 258 Q200 268 215 258"
            stroke="#3D2E2A"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
        </motion.g>

        <motion.g
          className="tail-wag"
          style={{ transformOrigin: "270px 250px" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <path
            d="M265 250 C290 230, 310 260, 295 285"
            stroke="#8B6F5E"
            strokeWidth="18"
            fill="none"
            strokeLinecap="round"
          />
        </motion.g>

        <motion.g
          className="paw-float"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 0.7, x: 0 }}
          transition={{ delay: 0.9 }}
        >
          <g transform="translate(70, 90) rotate(-15)">
            <ellipse cx="20" cy="28" rx="12" ry="10" fill="#FFB5C5" />
            <ellipse cx="8" cy="14" rx="5" ry="6" fill="#FFB87A" />
            <ellipse cx="18" cy="8" rx="5" ry="6" fill="#FFB87A" />
            <ellipse cx="28" cy="8" rx="5" ry="6" fill="#FFD4DE" />
            <ellipse cx="36" cy="16" rx="5" ry="6" fill="#FFB5C5" />
          </g>
        </motion.g>

        <motion.g
          className="paw-float-delayed"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 0.6, x: 0 }}
          transition={{ delay: 1.1 }}
        >
          <g transform="translate(290, 310) rotate(20)">
            <ellipse cx="20" cy="28" rx="12" ry="10" fill="#C4A882" />
            <ellipse cx="8" cy="14" rx="5" ry="6" fill="#8B6F5E" />
            <ellipse cx="18" cy="8" rx="5" ry="6" fill="#FFB87A" />
            <ellipse cx="28" cy="8" rx="5" ry="6" fill="#FFB87A" />
            <ellipse cx="36" cy="16" rx="5" ry="6" fill="#FFD4DE" />
          </g>
        </motion.g>

        <motion.path
          d="M60 200 Q120 160 180 190"
          stroke="#FF9F5A"
          strokeWidth="2"
          fill="none"
          strokeDasharray="6 8"
          animate={{ strokeDashoffset: [0, -28] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d="M220 120 Q280 90 340 130"
          stroke="#E8899E"
          strokeWidth="2"
          fill="none"
          strokeDasharray="6 8"
          animate={{ strokeDashoffset: [0, 28] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />
      </svg>
    </div>
  );
}
