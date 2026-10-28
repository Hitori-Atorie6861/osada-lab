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
  const linkColumns = [
    [
      { label: dict.nav.about, href: "/about" },
      { label: dict.nav.members, href: "/members" },
      { label: dict.nav.research, href: "/research" },
      { label: dict.nav.publications, href: "/publications" },
    ],
    [
      { label: dict.nav.seminar, href: "/seminar" },
      { label: dict.nav.lecture, href: "/lecture" },
      { label: dict.nav.news, href: "/news" },
      { label: dict.nav.contact, href: "/contact" },
    ],
  ];

  return (
    <footer className="border-t border-border bg-background">
      <div className={container}>
        <div className="grid gap-10 py-12 md:py-16 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-20">
          {/* Lab information */}
          <div className="min-w-0">
            <Link
              href={`/${locale}`}
              className="inline-block text-2xl font-medium tracking-tight text-primary md:text-3xl"
            >
              Osada Lab
            </Link>

            <p className="mt-3 text-sm tracking-wide text-text-secondary">
              {locale === "ja"
                ? "埼玉大学 経済学部 · 長田研究室"
                : "Faculty of Economics, Saitama University"}
            </p>

            <p className="mt-5 max-w-[480px] text-sm leading-7 text-text-secondary">
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
            className="grid grid-cols-2 gap-x-8 md:gap-x-12"
          >
            {linkColumns.map((column, index) => (
              <ul key={index} className="space-y-1">
                {column.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={`/${locale}${link.href}`}
                      className="inline-flex min-h-11 items-center text-[15px] leading-6 text-text-secondary transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
          </nav>
        </div>

        {/* Copyright */}
        <div className="border-t border-border py-6">
          <p className="text-xs leading-6 tracking-wide text-text-secondary">
            © {new Date().getFullYear()} Osada Lab.{" "}
            {dict.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}