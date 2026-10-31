
"use client";

export type NewsCategory =
  | "all"
  | "お知らせ"
  | "論文"
  | "受賞"
  | "研究"
  | "イベント"
  | "ゼミ";

type Props = {
  locale: "ja" | "en";
  selectedCategory: NewsCategory;
  onCategoryChange: (category: NewsCategory) => void;
};

const categories: {
  value: NewsCategory;
  ja: string;
  en: string;
}[] = [
  { value: "all", ja: "すべて", en: "All" },
  { value: "お知らせ", ja: "お知らせ", en: "Announcements" },
  { value: "論文", ja: "論文", en: "Publications" },
  { value: "受賞", ja: "受賞", en: "Awards" },
  { value: "研究", ja: "研究", en: "Research" },
  { value: "イベント", ja: "イベント", en: "Events" },
  { value: "ゼミ", ja: "ゼミ", en: "Seminar" },
];

export default function NewsCategorySelect({
  locale,
  selectedCategory,
  onCategoryChange,
}: Props) {
  return (
    <div className="w-full sm:max-w-[280px]">
      <label
        htmlFor="news-category"
        className="mb-2 block text-sm font-medium text-text-secondary md:mb-3"
      >
        {locale === "ja" ? "カテゴリー" : "Category"}
      </label>

      <select
        id="news-category"
        value={selectedCategory}
        onChange={(event) =>
          onCategoryChange(event.target.value as NewsCategory)
        }
        className="min-h-12 w-full cursor-pointer rounded-sm border border-border bg-white px-3 py-3 text-base text-text-primary outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 md:px-4"
      >
        {categories.map((category) => (
          <option key={category.value} value={category.value}>
            {locale === "ja" ? category.ja : category.en}
          </option>
        ))}
      </select>
    </div>
  );
}
