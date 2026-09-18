import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const CHAPTER_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScT8S5ygsbBoEzovYqMu-b30oQmUyzNE3LvwL8IB0PsSu5KzA/viewform?usp=sharing&ouid=108311353656256203293";
