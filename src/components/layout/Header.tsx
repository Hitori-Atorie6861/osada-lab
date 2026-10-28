import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import LanguageSwitcher from "./LanguageSwitcher";
import MobileNav from "./MobileNav";
import { navItems } from "./nav";

export default function Header({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex min-h-20 w-full max-w-[1800px] items-center justify-between gap-6 px-6 md:px-10 lg:px-16 xl:px-20">
        {/* Logo */}
        <Link
          href={`/${locale}`}
          className="flex shrink-0 items-center gap-3 text-primary"
        >
          <Image
            src="/osada_senseni2.png"
            alt="長田研究室のロゴ"
            width={56}
            height={56}
            className="h-11 w-11 object-contain mix-blend-multiply md:h-14 md:w-14"
          />

          <span className="whitespace-nowrap text-2xl font-bold tracking-tight">
            Osada Lab
          </span>
        </Link>

        <div className="ml-auto flex items-center gap-5 2xl:gap-8">
          {/* Desktop navigation: 1280px以上 */}
          <nav
            aria-label={
              locale === "ja"
                ? "メインナビゲーション"
                : "Main navigation"
            }
            className="hidden flex-nowrap items-center gap-5 xl:flex 2xl:gap-7"
          >
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={`/${locale}${item.href}`}
                className="whitespace-nowrap text-[15px] font-medium text-[#1F4D3A] transition-colors hover:text-[#163A2B]"
              >
                {dict.nav[item.key]}
              </Link>
            ))}
          </nav>

          {/* Language / Mobile menu */}
          <div className="flex shrink-0 items-center gap-4 xl:border-l xl:border-border xl:pl-6">
            <LanguageSwitcher locale={locale} />
            <MobileNav locale={locale} dict={dict} />
          </div>
        </div>
      </div>
    </header>
  );
}