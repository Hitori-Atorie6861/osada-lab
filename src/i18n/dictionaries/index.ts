import type { Locale } from "../config";
import { en } from "./en";
import { ja } from "./ja";

export const dictionaries = { ja, en } as const;

export type Dictionary = (typeof dictionaries)[Locale];

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
