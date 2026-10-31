
import Image from "next/image";

type PageBannerProps = {
  title: string;
};

export default function PageBanner({ title }: PageBannerProps) {
  return (
    <section className="relative flex min-h-[150px] items-center justify-center overflow-hidden border-b border-border px-4 sm:min-h-[180px] md:min-h-[240px] md:px-6">
      <Image
        src="/banner.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      <h1 className="relative z-10 text-center text-2xl font-medium text-primary sm:text-3xl md:text-5xl">
        {title}
      </h1>
    </section>
  );
}
