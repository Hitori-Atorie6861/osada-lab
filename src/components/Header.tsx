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
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2 text-lg font-bold tracking-tight text-primary"
        >
          <Image
            src="/lab-icon1.jpg"
            alt=""
            width={32}
            height={32}
            className="object-contain"
          />
          <span>XX Lab</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={`/${locale}${item.href}`}
              className="text-sm text-text-primary/80 transition-colors hover:text-primary"
            >
              {dict.nav[item.key]}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <LanguageSwitcher locale={locale} />
          <MobileNav locale={locale} dict={dict} />
        </div>
      </div>
    </header>
  );
}