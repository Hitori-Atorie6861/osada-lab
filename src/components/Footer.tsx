import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { getDictionary } from "@/i18n/dictionaries";

type Dict = ReturnType<typeof getDictionary>;

export default function Footer({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dict;
}) {
  const columns: { title: string; links: { label: string; href: string }[] }[] = [
    {
      title: dict.nav.about,
      links: [
        { label: dict.nav.about, href: "/about" },
        { label: dict.nav.research, href: "/research" },
        { label: dict.nav.members, href: "/members" },
      ],
    },
    {
      title: dict.nav.news,
      links: [
        { label: dict.nav.publications, href: "/publications" },
        { label: dict.nav.news, href: "/news" },
        { label: dict.nav.lecture, href: "/lecture" },
      ],
    },
  ];

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-3">
        <div>
          <p className="text-lg font-bold text-primary">XX Lab</p>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">
            {dict.footer.address}
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <p className="text-sm font-medium text-text-primary">{col.title}</p>
            <ul className="mt-4 space-y-2">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-sm text-text-secondary transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-6 text-xs text-text-secondary">
          © {new Date().getFullYear()} XX Lab. {dict.footer.rights}
        </div>
      </div>
    </footer>
  );
}
