"use client";

import { motion } from "framer-motion";

export function PawLogo({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <motion.ellipse
        cx="32"
        cy="42"
        rx="14"
        ry="12"
        fill="currentColor"
        initial={{ scale: 0.9 }}
        animate={{ scale: [0.9, 1, 0.9] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.ellipse
        cx="16"
        cy="24"
        rx="6"
        ry="7"
        fill="currentColor"
        className="text-pink-deep"
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.2 }}
      />
      <motion.ellipse
        cx="28"
        cy="16"
        rx="6"
        ry="7"
        fill="currentColor"
        className="text-orange-deep"
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, delay: 0.4 }}
      />
      <motion.ellipse
        cx="40"
        cy="16"
        rx="6"
        ry="7"
        fill="currentColor"
        className="text-orange"
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 2.6, repeat: Infinity, delay: 0.6 }}
      />
      <motion.ellipse
        cx="50"
        cy="26"
        rx="6"
        ry="7"
        fill="currentColor"
        className="text-pink"
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, delay: 0.8 }}
      />
    </svg>
  );
}
