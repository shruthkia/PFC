"use client";

import { motion } from "framer-motion";
import { HouseMark } from "@/components/brand/house-mark";
import { PawPrint } from "@/components/brand/house-mark";

export function LineArtScene() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-lg" aria-hidden>
      <div className="absolute inset-0 border-2 border-foreground bg-gradient-to-br from-pink-soft/70 via-orange-soft/50 to-cream dark:from-pink-soft/25 dark:via-orange-soft/15 dark:to-card" />

      <div className="relative flex h-full flex-col items-center justify-center p-8">
        <motion.div
          className="w-[70%] text-foreground"
          initial={{ scale: 0.86, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <HouseMark className="h-auto w-full max-w-sm" decorative />
        </motion.div>
      </div>

      <motion.div
        className="absolute left-6 top-8 text-pink-hot"
        animate={{ y: [0, -8, 0], rotate: [-12, -6, -12] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <PawPrint className="h-10 w-10" />
      </motion.div>
      <motion.div
        className="absolute right-10 top-16 text-orange-hot"
        animate={{ y: [0, 10, 0], rotate: [10, 18, 10] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      >
        <PawPrint className="h-8 w-8" />
      </motion.div>
      <motion.div
        className="absolute bottom-16 left-10 text-brown"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      >
        <PawPrint className="h-7 w-7" />
      </motion.div>
      <motion.div
        className="absolute bottom-10 right-8 text-pink"
        animate={{ y: [0, 8, 0], rotate: [8, 0, 8] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
      >
        <PawPrint className="h-12 w-12" />
      </motion.div>

      <motion.div
        className="absolute -right-3 top-10 border-2 border-foreground bg-orange px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-widest text-brown-dark"
        initial={false}
        animate={{ rotate: [3, 7, 3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        High school
      </motion.div>
      <motion.div
        className="absolute -bottom-3 -left-3 border-2 border-foreground bg-pink-hot px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-widest text-white"
        animate={{ rotate: [-2, 2, -2] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        15+ launching
      </motion.div>
    </div>
  );
}
