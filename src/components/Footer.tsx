
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

const container =
  "mx-auto w-full max-w-[1800px] px-6 md:px-10 lg:px-16 xl:px-20";

export default function Footer({ locale, dict }: Props) {
  const leftLinks = [
    { label: dict.nav.about, href: "/about" },
    { label: dict.nav.research, href: "/research" },
    { label: dict.nav.publications, href: "/publications" },
    { label: dict.nav.members, href: "/members" },
  ];

  const rightLinks = [
    { label: dict.nav.seminar, href: "/seminar" },
    { label: dict.nav.lecture, href: "/lecture" },
    { label: dict.nav.news, href: "/news" },
    { label: dict.nav.contact, href: "/contact" },
  ];

  return (
    <footer className="border-t border-border bg-background">
      <div
        className={`${container} grid gap-10 py-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16 lg:py-12`}
      >
        {/* Lab Information */}
        <div className="min-w-0">
          <Link
            href={`/${locale}`}
            className="text-2xl font-bold tracking-tight text-primary"
          >
            Osada Lab
          </Link>

          <p className="mt-3 text-sm leading-7 text-text-secondary">
            {locale === "ja"
              ? "埼玉大学 経済学部・長田研究室"
              : "Osada Lab, Faculty of Economics, Saitama University"}
          </p>

          <p className="mt-4 max-w-[560px] whitespace-pre-line text-sm leading-7 text-text-secondary">
            {dict.footer.address}
          </p>
        </div>

        {/* Navigation */}
        <nav
          aria-label={
            locale === "ja"
              ? "フッターナビゲーション"
              : "Footer navigation"
          }
          className="w-full lg:w-[360px]"
        >
          <div className="grid grid-cols-2 gap-x-8 md:gap-x-12">
            {/* Left Column */}
            <ul className="space-y-1">
              {leftLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="inline-flex min-h-9 items-center text-sm text-text-secondary transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Right Column */}
            <ul className="space-y-1">
              {rightLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="inline-flex min-h-9 items-center text-sm text-text-secondary transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>

      {/* Copyright */}
      <div className="border-t border-border">
        <div
          className={`${container} py-4 text-xs text-text-secondary`}
        >
          © {new Date().getFullYear()} Osada Lab.{" "}
          {dict.footer.rights}
        </div>
      </div>
    </footer>
  );
}
