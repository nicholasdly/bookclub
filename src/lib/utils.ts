import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { customAlphabet } from "nanoid";

/**
 * Helper function to make it easier to conditionally add Tailwind CSS classes.
 * @param inputs Tailwind CSS
 * @returns `string`
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generates a random six digit one time password (OTP).
 * @returns `string`
 * @see https://zelark.github.io/nano-id-cc/
 */
export function otp() {
  const alphabet = "1234567890";
  const length = 6;

  const otp = customAlphabet(alphabet, length);
  return otp();
}

/**
 * Generates a random twenty character alphanumeric nanoid.
 * @returns `string`
 * @see https://zelark.github.io/nano-id-cc/
 */
export function nanoid() {
  const alphabet =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const length = 20;

  const nanoid = customAlphabet(alphabet, length);
  return nanoid();
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
