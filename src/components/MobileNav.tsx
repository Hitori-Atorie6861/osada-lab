"use client";

import { useState } from "react";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { getDictionary } from "@/i18n/dictionaries";

type Dict = ReturnType<typeof getDictionary>;

export default function MobileNav({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dict;
}) {
  const [open, setOpen] = useState(false);

  const navItems: { key: keyof Dict["nav"]; href: string }[] = [
    { key: "about", href: "/about" },
    { key: "research", href: "/research" },
    { key: "seminar", href: "/seminar" },
    { key: "members", href: "/members" },
    { key: "publications", href: "/publications" },
    { key: "news", href: "/news" },
    { key: "lecture", href: "/lecture" },
    { key: "contact", href: "/contact" },
  ];

  return (
    <div className="md:hidden">
      {/* ハンバーガーボタン */}
      <button
        type="button"
        aria-label={open ? "メニューを閉じる" : "メニューを開く"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="relative z-[10001] flex h-10 w-10 items-center justify-center bg-white"
      >
        <span className="relative flex h-6 w-6 items-center justify-center">
          <span
            className={`absolute h-0.5 w-6 bg-text-primary transition-transform duration-300 ${
              open ? "rotate-45" : "-translate-y-2"
            }`}
          />
          <span
            className={`absolute h-0.5 w-6 bg-text-primary transition-opacity duration-300 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute h-0.5 w-6 bg-text-primary transition-transform duration-300 ${
              open ? "-rotate-45" : "translate-y-2"
            }`}
          />
        </span>
      </button>

      {/* フルスクリーンメニュー */}
      <div
        className={`fixed left-0 top-0 z-[10000] h-[100dvh] w-screen bg-white transition-opacity duration-300 ${
          open
            ? "pointer-events-auto visible opacity-100"
            : "pointer-events-none invisible opacity-0"
        }`}
      >
        <div className="mx-auto flex h-full max-w-6xl flex-col overflow-y-auto bg-white px-6">
          {/* ヘッダー分の余白 */}
          <div className="h-20 shrink-0" />

          {/* ナビゲーション */}
          <nav className="flex flex-col pb-8">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={`/${locale}${item.href}`}
                onClick={() => setOpen(false)}
                className="border-b border-border py-5 text-xl font-medium text-text-primary"
              >
                {dict.nav[item.key]}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}