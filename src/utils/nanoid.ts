import { customAlphabet } from 'nanoid';

/**
 * Generates a random string of specified alphabet and length using [Nano ID](https://github.com/ai/nanoid).
 * @returns A randomly generated string
 */
export function generateNanoId() {
  const alphabet = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const length = 12;

  const nanoid = customAlphabet(alphabet, length);
  return nanoid();
}
