import type { Locale } from "./config";
import { en } from "./dictionaries/en";
import { ja } from "./dictionaries/ja";

export const dictionaries = { ja, en } as const;

export type Dictionary = (typeof dictionaries)[Locale];

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}