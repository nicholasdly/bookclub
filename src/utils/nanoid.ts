import { customAlphabet } from "nanoid";

/**
 * Generates a random  of specified alphabet and length using [Nano ID](https://github.com/ai/nanoid).
 * @returns A randomly generated string
 */
export function generateNanoId() {
  const alphabet = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const length = 20;

  const nanoid = customAlphabet(alphabet, length);
  return nanoid();
}
