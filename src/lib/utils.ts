import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function randomImage() {
  const token = Math.floor(Math.random() * 100);
  return `https://deno-avatar.deno.dev/avatar/${token}.svg`;
}
