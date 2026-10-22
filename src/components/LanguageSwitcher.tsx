"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";

export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();

  function pathForLocale(target: Locale) {
    const segments = pathname.split("/");
    segments[1] = target;
    return segments.join("/") || "/";
  }

  return (
    <div className="flex items-center gap-1 text-sm">
      {locales.map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span className="text-border">/</span>}
          <Link
            href={pathForLocale(l)}
            aria-current={l === locale ? "true" : undefined}
            className={
              l === locale
                ? "font-medium text-primary"
                : "text-text-secondary transition-colors hover:text-primary"
            }
          >
            {l.toUpperCase()}
          </Link>
        </span>
      ))}
    </div>
  );
}
