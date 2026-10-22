import type { Dictionary } from "@/i18n/dictionaries";

export const navItems: { key: keyof Dictionary["nav"]; href: string }[] = [
  { key: "about", href: "/about" },
  { key: "research", href: "/research" },
  { key: "seminar", href: "/seminar" },
  { key: "members", href: "/members" },
  { key: "publications", href: "/publications" },
  { key: "news", href: "/news" },
  { key: "lecture", href: "/lecture" },
  { key: "contact", href: "/contact" },
];
