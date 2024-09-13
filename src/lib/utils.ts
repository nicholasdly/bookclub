import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Helper function to make it easier to conditionally add Tailwind CSS classes.
 * @param inputs Tailwind CSS
 * @returns `string`
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
