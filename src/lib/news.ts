import type { Locale } from "@/i18n/config";

export type NewsCategory =
  | "お知らせ"
  | "論文"
  | "受賞"
  | "研究"
  | "イベント"
  | "ゼミ";

export function formatNewsDate(
  date: string,
  locale: Locale,
): string {
  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return date;

  return parsed.toLocaleDateString(
    locale === "ja" ? "ja-JP" : "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );
}

export function getCategoryLabel(
  category: NewsCategory,
  locale: Locale,
): string {
  const labels: Record<
    NewsCategory,
    { ja: string; en: string }
  > = {
    お知らせ: {
      ja: "お知らせ",
      en: "News",
    },
    論文: {
      ja: "論文",
      en: "Publication",
    },
    受賞: {
      ja: "受賞",
      en: "Award",
    },
    研究: {
      ja: "研究",
      en: "Research",
    },
    イベント: {
      ja: "イベント",
      en: "Event",
    },
    ゼミ: {
      ja: "ゼミ",
      en: "Seminar",
    },
  };

  return labels[category][locale];
}