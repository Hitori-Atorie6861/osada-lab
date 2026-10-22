import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { getDictionary } from "@/i18n/dictionaries";
import TerrainBackground from "@/components/TerrainBackground";

type Dict = ReturnType<typeof getDictionary>;

export default function Hero({ locale, dict }: { locale: Locale; dict: Dict }) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-surface">
      <TerrainBackground />

      {/* 
        左側（Research付近）まで白背景を維持し、右側に向けて透明になるグラデーション 
        bg-gradient-to-r: 左から右へ
        from-surface via-surface/90: 左側〜中央手前までは白（または背景色）
        to-transparent: 右側は透過してアニメーションを見せる
      */}
      <div 
        aria-hidden 
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-surface via-surface/90 via-45% to-transparent" 
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-xl md:py-[120px]">
        <p className="text-sm font-medium tracking-wide text-primary">
          {dict.hero.eyebrow}
        </p>
        <h1 className="mt-6 max-w-2xl whitespace-pre-line text-4xl font-bold text-text-primary md:text-5xl">
          {dict.hero.title}
        </h1>
        <p className="mt-6 max-w-xl text-base leading-loose text-text-secondary">
          {dict.hero.subtitle}
        </p>
        <Link
          href={`/${locale}/research`}
          className="mt-10 inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-light"
        >
          {dict.hero.cta}
          <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}