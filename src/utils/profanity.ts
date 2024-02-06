import {
  TextCensor,
  RegExpMatcher,
  englishDataset,
  englishRecommendedTransformers,
} from "obscenity";

const profanityMatcher = new RegExpMatcher({
  ...englishDataset.build(),
  ...englishRecommendedTransformers,
});

const censor = new TextCensor().setStrategy((ctx) =>
  "*".repeat(ctx.matchLength),
);

/**
 * Censors profanity from a given string `text` by replacing all profanity with astericks of the same lenth.
 * @param text The text in which profanity will be censored.
 * @returns The same text, except all profanity has been replaced with asterisks.
 */
export function censorProfanity(text: string) {
  const profanity = profanityMatcher.getAllMatches(text);
  return censor.applyTo(text, profanity);
}