import Image from "next/image";

type PageBannerProps = {
  title: string;
};

export default function PageBanner({ title }: PageBannerProps) {
  return (
    <section className="relative flex min-h-[240px] items-center justify-center overflow-hidden border-b border-border px-6">
      {/* Background image */}
      <Image
        src="/picture.jpg"
        alt=""
        fill
        priority
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Title */}
      <h1 className="relative z-10 text-center text-4xl font-bold text-white md:text-5xl">
        {title}
      </h1>
    </section>
  );
}