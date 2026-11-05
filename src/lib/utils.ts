import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const CHAPTER_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSftTTnp2gOjve20xRyvtBdNwr7hclFw8jJgq4vW5q9Ub9sc0w/viewform";
