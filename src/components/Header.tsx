import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/i18n/config";
import type { getDictionary } from "@/i18n/dictionaries";
import LanguageSwitcher from "./LanguageSwitcher";
import MobileNav from "./MobileNav";

type Dict = ReturnType<typeof getDictionary>;

export default function Header({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dict;
}) {
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
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="site-container">
        <div className="flex min-h-20 items-center justify-between gap-6 md:min-h-24">
          <Link
            href={`/${locale}`}
            className="flex shrink-0 items-center gap-3 text-primary md:gap-4"
          >
            <Image
              src="/pic1.jpg"
              alt=""
              width={56}
              height={56}
              className="h-11 w-11 object-contain md:h-14 md:w-14"
            />

            <span className="text-2xl font-bold tracking-tight md:text-3xl">
              XX Lab
            </span>
          </Link>

          <div className="flex shrink-0 items-center gap-5">
            <LanguageSwitcher locale={locale} />
            <MobileNav locale={locale} dict={dict} />
          </div>
        </div>

        <nav
          aria-label={locale === "ja" ? "メインナビゲーション" : "Main navigation"}
          className="hidden flex-wrap items-center gap-x-8 gap-y-3 pb-6 pt-2 md:flex lg:gap-x-10"
        >
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={`/${locale}${item.href}`}
              className="whitespace-nowrap text-base font-medium text-text-primary/80 transition-colors hover:text-primary"
            >
              {dict.nav[item.key]}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}