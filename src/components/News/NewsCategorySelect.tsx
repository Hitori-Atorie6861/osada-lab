"use client";

import { useState } from "react";

type Category =
  | "all"
  | "お知らせ"
  | "論文"
  | "受賞"
  | "研究"
  | "イベント"
  | "ゼミ";

type CategoryOption = {
  label: string;
  value: Category;
};

type Props = {
  locale: "ja" | "en";
  selectedCategory: Category;
  onCategoryChange: (category: Category) => void;
};

export default function NewsCategorySelect({
  locale,
  selectedCategory,
  onCategoryChange,
}: Props) {
  const [open, setOpen] = useState(false);

  const categories: CategoryOption[] =
    locale === "ja"
      ? [
          { label: "すべて", value: "all" },
          { label: "お知らせ", value: "お知らせ" },
          { label: "論文", value: "論文" },
          { label: "受賞", value: "受賞" },
          { label: "研究", value: "研究" },
          { label: "イベント", value: "イベント" },
          { label: "ゼミ", value: "ゼミ" },
        ]
      : [
          { label: "All", value: "all" },
          { label: "News", value: "お知らせ" },
          { label: "Publication", value: "論文" },
          { label: "Award", value: "受賞" },
          { label: "Research", value: "研究" },
          { label: "Event", value: "イベント" },
          { label: "Seminar", value: "ゼミ" },
        ];

  const selectedLabel =
    categories.find((category) => category.value === selectedCategory)
      ?.label ?? "All";

  return (
    <div className="mt-12 w-full">
      {/* Category label */}
      <p className="text-sm font-medium tracking-[0.15em] text-primary">
        CATEGORY
      </p>

      {/* Category select */}
      <div className="relative mt-3 ml-auto w-full max-w-[360px]">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex w-full items-center justify-between border-b border-border px-4 py-4 text-left text-base text-text-primary transition-colors duration-200 hover:text-primary"
        >
          <span className="whitespace-nowrap">{selectedLabel}</span>

          <span
            className={`ml-4 shrink-0 text-base transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          >
            ⌄
          </span>
        </button>

        {open && (
          <div className="absolute left-0 right-0 top-full z-30 border border-border bg-white shadow-md">
            {categories.map((category) => {
              const isSelected = selectedCategory === category.value;

              return (
                <button
                  key={category.value}
                  type="button"
                  onClick={() => {
                    onCategoryChange(category.value);
                    setOpen(false);
                  }}
                  className={`relative block w-full cursor-pointer px-5 py-4 text-left text-sm transition-colors duration-200 ${
                    isSelected
                      ? "bg-[#EEF3F0] font-medium text-primary"
                      : "text-text-primary hover:bg-[#F5F7F6] hover:text-primary"
                  }`}
                >
                  {/* Selected indicator */}
                  {isSelected && (
                    <span className="absolute left-0 top-0 h-full w-[2px] bg-primary" />
                  )}

                  {category.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}