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

/**
 * Generates a random user image URL.
 * @returns `string`
 */
export function randomImage() {
  const token = Math.floor(Math.random() * 100);
  return `https://deno-avatar.deno.dev/avatar/${token}.svg`;
}

/**
 * Formats a number into compact notation, similar to how popular social media
 * platforms style metrics such as likes, comments, views, etc.
 * @param value `number` or `bigint`
 * @returns `string`
 */
export const formatNumber = Intl.NumberFormat("en", {
  notation: "compact",
}).format;
