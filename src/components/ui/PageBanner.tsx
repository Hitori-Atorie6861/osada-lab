import Image from "next/image";

type PageBannerProps = {
  title: string;
};

export default function PageBanner({ title }: PageBannerProps) {
  return (
    <section className="relative flex min-h-[240px] items-center justify-center overflow-hidden border-b border-border px-6">
      <Image
        src="/banner.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      <h1 className="relative z-10 text-center text-4xl font-medium text-primary md:text-5xl">
        {title}
      </h1>
    </section>
  );
}