import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { getNewsList } from "@/lib/cms";
import { formatNewsDate, getCategoryLabel } from "@/lib/news";
import DataWave from "./DataWave";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

const images = {
  hero: { src: "/pic1.jpg", alt: "" },
  research: { src: "/reseach_image.png", alt: "" },
  seminar: { src: "/dicussion.png", alt: "" },
  professor: { src: "/osadat.jpg", alt: "長田 健" },
  contact: { src: "/picture.jpg", alt: "" },
};

const container =
  "mx-auto w-full max-w-[1800px] px-6 md:px-10 lg:px-16 xl:px-20";

const primaryButton =
  "inline-flex min-h-12 items-center justify-between gap-10 border border-[#1B3A2F] bg-[#1B3A2F] px-6 py-3 text-sm text-white transition-colors hover:bg-[#2E5443]";

const secondaryButton =
  "inline-flex min-h-12 items-center justify-between gap-10 border border-[#1B3A2F]/40 px-6 py-3 text-sm transition-colors hover:bg-[#E8EDE3]";

function Arrow() {
  return (
    <span
      aria-hidden="true"
      className="inline-block shrink-0 transition-transform group-hover:translate-x-1"
    >
      →
    </span>
  );
}

export default async function HomePage({ locale, dict }: Props) {
  const isJa = locale === "ja";
  const href = (path: string) => `/${locale}/${path}`;

  const news = (await getNewsList()).slice(0, 4);

  const text = {
    heroBody: isJa
      ? "銀行、金融政策、そして人と社会のつながり。長田研究室では、金融の仕組みを研究し、よりよい社会のあり方を考えます。"
      : "Banking, monetary policy, and the connections between people and society. We study how finance works and what it means for a better society.",
    researchLink: isJa ? "研究を知る" : "Our research",
    seminarLink: isJa ? "ゼミを知る" : "Our seminar",
    newsTitle: isJa
      ? "研究室からのお知らせ"
      : "Updates from the laboratory",
    newsLink: isJa ? "ニュースをすべて見る" : "View all news",
    activitiesTitle: isJa ? "研究とゼミ活動" : "Research & learning",
    researchTitle: isJa
      ? "金融の仕組みから、\n社会の動きを考える。"
      : "How finance works.\nHow society changes.",
    researchBody: isJa
      ? "銀行と金融システム、金融政策、金融市場と経済発展。複数の視点をつなぎ、金融と社会の関係を探究しています。"
      : "From banking and financial systems to monetary policy and economic development, we bring together different perspectives on finance and society.",
    allResearch: isJa ? "すべての研究領域" : "All research areas",
    publications: isJa ? "論文・研究業績" : "Publications",
    seminarTitle: isJa
      ? "問いを持ち、語り合い、\n教室の外へ。"
      : "Ask. Discuss.\nGo beyond the classroom.",
    seminarBody: isJa
      ? "金融・経済を学び、仲間と議論し、自分の考えを深める。企業訪問やコンテストへの挑戦など、人や社会との出会いも学びにつなげます。"
      : "Study finance and economics, exchange ideas, and develop your own perspective. Company visits and competitions connect our learning with people and society.",
    seminarDetails: isJa ? "ゼミでの学び・活動" : "Explore the seminar",
    lecture: isJa ? "講義案内" : "Courses",
    professorLabel: isJa ? "教員紹介" : "Faculty profile",
    professorName: dict.professor.name,
    professorRole: isJa ? "教授" : "Professor",
    professorSpecialty: isJa ? "金融論・銀行論" : "Finance and Banking",
    professorBody: isJa
      ? "銀行と金融システム、金融政策・金融行政を中心に研究しています。専門分野や経歴はプロフィールをご覧ください。"
      : "Research interests include banking, financial systems, monetary policy, and financial regulation. Learn more about his expertise and career.",
    professorLink: isJa ? "プロフィール・経歴" : "Profile & career",
    contactTitle: isJa ? "研究室へのお問い合わせ" : "Get in touch",
    contactBody: isJa
      ? "研究やゼミに関するご連絡はこちらから。"
      : "Contact us about our research and seminar.",
    contactLink: isJa ? "お問い合わせ" : "Contact us",
  };

  return (
    <div className="bg-[#FAFAF8] text-[#1B3A2F]" lang={locale}>
      {/* HERO */}
      <section
        aria-labelledby="home-title"
        className="grid border-b border-[#1B3A2F]/15 lg:grid-cols-2"
      >
        <div className="flex min-w-0 flex-col justify-center px-6 py-12 md:px-10 md:py-16 lg:min-h-[600px] lg:px-16 xl:px-20">
          <p className="text-xs leading-6 tracking-[0.12em]">
            {isJa
              ? "埼玉大学 経済学部 · 長田研究室"
              : "Faculty of Economics, Saitama University"}
          </p>

          <h1
            id="home-title"
            className="mt-8 font-medium tracking-[-0.025em]"
          >
            {isJa ? (
              <>
                <span className="block text-[clamp(1.75rem,3vw,3.5rem)] leading-[1.4]">
                  金融で、より幸せな社会へ
                </span>

                <span
                  lang="en"
                  className="mt-5 block text-[clamp(1.5rem,2.5vw,2.75rem)] leading-[1.4]"
                >
                  Money and Finance
                  <br />
                  for a Happier Society
                </span>
              </>
            ) : (
              <span className="block text-[clamp(2rem,3.5vw,3.5rem)] leading-[1.4]">
                Money and Finance
                <br />
                for a Happier Society
              </span>
            )}
          </h1>

          <p className="mt-6 w-full max-w-[560px] text-base leading-8 text-[#1B3A2F]/80">
            {text.heroBody}
          </p>
        </div>

        <div className="relative aspect-[16/9] overflow-hidden lg:aspect-auto lg:min-h-[600px]">
          <DataWave />
        </div>
      </section>

      {/* NEWS */}
      <section
        aria-labelledby="home-news-title"
        className="border-b border-[#1B3A2F]/15 bg-white"
      >
        <div className={`${container} py-14 md:py-20`}>
          <div className="grid gap-8 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-12">
            <div>
              <h2
                id="home-news-title"
                className="text-4xl font-medium tracking-[-0.03em] md:text-5xl"
              >
                News
              </h2>

              <p className="mt-3 text-xs leading-6 text-[#1B3A2F]/70">
                {text.newsTitle}
              </p>
            </div>

            <div className="min-w-0">
              {news.length === 0 ? (
                <p className="border-t border-[#1B3A2F]/15 py-8 text-sm text-[#1B3A2F]/70">
                  {dict.news.empty}
                </p>
              ) : (
                <ul className="divide-y divide-[#1B3A2F]/15 border-y border-[#1B3A2F]/15">
                  {news.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={href(`news/${encodeURIComponent(item.id)}`)}
                        className="group grid gap-3 py-6 transition-colors hover:bg-[#F3F5EF] md:grid-cols-[150px_minmax(0,1fr)_20px] md:items-center md:gap-5"
                      >
                        <time
                          dateTime={item.date}
                          className="text-xs text-[#1B3A2F]/70"
                        >
                          {formatNewsDate(item.date, locale)}
                        </time>

                        <div className="min-w-0">
                          {item.category.length > 0 && (
                            <div className="mb-2 flex flex-wrap gap-2">
                              {item.category.map((category) => (
                                <span
                                  key={category}
                                  className="border border-[#1B3A2F]/20 px-2 py-0.5 text-[11px] text-[#1B3A2F]/80"
                                >
                                  {getCategoryLabel(category, locale)}
                                </span>
                              ))}
                            </div>
                          )}

                          <h3 className="break-words text-sm font-medium leading-7 group-hover:underline group-hover:underline-offset-4">
                            {item.title}
                          </h3>
                        </div>

                        <span className="hidden md:block">
                          <Arrow />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-7 flex justify-end">
                <Link
                  href={href("news")}
                  className={`group ${secondaryButton}`}
                >
                  {text.newsLink}
                  <Arrow />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section
        aria-labelledby="home-about-title"
        className="bg-[#F0F4F0] text-center"
      >
        <div className={`${container} py-16 md:py-20`}>
          <p className="text-4xl tracking-[-0.03em] md:text-5xl">
            About
          </p>

          <p className="mt-3 text-xs text-[#1B3A2F]/70">
            {dict.nav.about}
          </p>

          <h2
            id="home-about-title"
            className="mx-auto mt-8 max-w-4xl text-xl font-medium leading-[1.8] md:text-3xl"
          >
            {dict.about.mission.title}
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-8 text-[#1B3A2F]/80">
            {dict.about.body}
          </p>

          <Link
            href={href("about")}
            className={`group mt-8 ${primaryButton}`}
          >
            {dict.hero.cta}
            <Arrow />
          </Link>
        </div>
      </section>

      {/* ACTIVITIES */}
      <section
        aria-labelledby="home-activities-title"
        className="bg-white"
      >
        <div className={`${container} py-16 md:py-20`}>
          <div className="mb-10 text-center md:mb-12">
            <p className="text-4xl tracking-[-0.03em] md:text-5xl">
              Activities
            </p>

            <h2
              id="home-activities-title"
              className="mt-3 text-sm font-normal"
            >
              {text.activitiesTitle}
            </h2>
          </div>

          <div className="grid gap-12 md:grid-cols-2 md:gap-10">
            {/* RESEARCH */}
            <article className="flex min-w-0 flex-col">
              <Link
                href={href("research")}
                aria-label={text.researchLink}
                className="group relative block aspect-[3/2] overflow-hidden bg-[#E8EDE3]"
              >
                <Image
                  src={images.research.src}
                  alt={images.research.alt}
                  fill
                  sizes="(max-width: 767px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />

                <span className="absolute bottom-0 right-0 grid h-12 w-12 place-items-center bg-[#1B3A2F] text-white">
                  <Arrow />
                </span>
              </Link>

              <p className="mt-6 text-[11px] tracking-[0.15em] text-[#1B3A2F]/70">
                01 / RESEARCH
              </p>

              <h3 className="mt-3 whitespace-pre-line text-2xl font-medium leading-[1.6] tracking-[-0.025em] lg:text-3xl">
                {text.researchTitle}
              </h3>

              <p className="mb-8 mt-5 text-base leading-8 text-[#1B3A2F]/80">
                {text.researchBody}
              </p>

              <div className="mt-auto flex flex-wrap justify-between gap-x-6 gap-y-2 border-t border-[#1B3A2F]/15 pt-4">
                <Link
                  href={href("research")}
                  className="group inline-flex min-h-11 items-center gap-5 text-sm hover:underline hover:underline-offset-4"
                >
                  {text.allResearch}
                  <Arrow />
                </Link>

                <Link
                  href={href("publications")}
                  className="group inline-flex min-h-11 items-center gap-5 text-sm hover:underline hover:underline-offset-4"
                >
                  {text.publications}
                  <Arrow />
                </Link>
              </div>
            </article>

            {/* SEMINAR */}
            <article className="flex min-w-0 flex-col">
              <Link
                href={href("seminar")}
                aria-label={text.seminarLink}
                className="group relative block aspect-[3/2] overflow-hidden bg-[#E8EDE3]"
              >
                <Image
                  src={images.seminar.src}
                  alt={images.seminar.alt}
                  fill
                  sizes="(max-width: 767px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />

                <span className="absolute bottom-0 right-0 grid h-12 w-12 place-items-center bg-[#1B3A2F] text-white">
                  <Arrow />
                </span>
              </Link>

              <p className="mt-6 text-[11px] tracking-[0.15em] text-[#1B3A2F]/70">
                02 / SEMINAR
              </p>

              <h3 className="mt-3 whitespace-pre-line text-2xl font-medium leading-[1.6] tracking-[-0.025em] lg:text-3xl">
                {text.seminarTitle}
              </h3>

              <p className="mb-8 mt-5 text-base leading-8 text-[#1B3A2F]/80">
                {text.seminarBody}
              </p>

              <div className="mt-auto flex flex-wrap justify-between gap-x-6 gap-y-2 border-t border-[#1B3A2F]/15 pt-4">
                <Link
                  href={href("seminar")}
                  className="group inline-flex min-h-11 items-center gap-5 text-sm hover:underline hover:underline-offset-4"
                >
                  {text.seminarDetails}
                  <Arrow />
                </Link>

                <Link
                  href={href("lecture")}
                  className="group inline-flex min-h-11 items-center gap-5 text-sm hover:underline hover:underline-offset-4"
                >
                  {text.lecture}
                  <Arrow />
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* PROFESSOR */}
      <section
        aria-labelledby="home-professor-title"
        className="bg-white"
      >
        <div className={container}>
          <div className="grid items-center gap-8 border-t border-[#1B3A2F]/15 py-14 md:grid-cols-[280px_minmax(0,1fr)] md:gap-12 md:py-20 lg:gap-20">
            <div className="relative mx-auto aspect-[4/5] w-[220px] overflow-hidden bg-[#E8EDE3] md:w-full">
              <Image
                src={images.professor.src}
                alt={images.professor.alt}
                fill
                sizes="(max-width: 767px) 220px, 280px"
                className="object-cover object-[center_25%]"
              />
            </div>

            <div className="text-center md:text-left">
              <p className="text-4xl tracking-[-0.03em] md:text-5xl">
                Professor
              </p>

              <p className="mt-3 text-xs text-[#1B3A2F]/70">
                {text.professorLabel}
              </p>

              <h2
                id="home-professor-title"
                className="mt-7 text-3xl font-medium"
              >
                {text.professorName}
              </h2>

              <p className="mt-3 text-sm text-[#1B3A2F]/70">
                {text.professorRole} / {text.professorSpecialty}
              </p>

              <p className="mx-auto mt-5 max-w-xl text-sm leading-8 text-[#1B3A2F]/80 md:mx-0">
                {text.professorBody}
              </p>

              <Link
                href={href("members")}
                className={`group mt-7 ${primaryButton}`}
              >
                {text.professorLink}
                <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section
        aria-labelledby="home-contact-title"
        className="relative isolate overflow-hidden bg-[#1B3A2F] text-center text-white"
      >
        <Image
          src="/123456.png"
          alt={images.contact.alt}
          fill
          sizes="100vw"
          className="-z-20 object-cover"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[#102A20]/80"
        />

        <div className={`${container} py-14 md:py-20`}>
          <p className="text-4xl tracking-[-0.03em] md:text-5xl">
            Contact
          </p>

          <h2
            id="home-contact-title"
            className="mt-3 text-sm font-normal"
          >
            {text.contactTitle}
          </h2>

          <p className="mt-6 text-sm leading-8 text-white/90">
            {text.contactBody}
          </p>

          <Link
            href={href("contact")}
            className="group mt-8 inline-flex min-h-12 items-center justify-between gap-12 border border-white/70 px-8 py-3 text-sm transition-colors hover:bg-white hover:text-[#1B3A2F]"
          >
            {text.contactLink}
            <Arrow />
          </Link>
        </div>
      </section>
    </div>
  );
}