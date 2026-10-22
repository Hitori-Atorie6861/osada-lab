import { createClient } from "microcms-js-sdk";

const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = process.env.MICROCMS_API_KEY;

if (!serviceDomain || !apiKey) {
  throw new Error(
    "MICROCMS_SERVICE_DOMAIN and MICROCMS_API_KEY must be set in environment variables.",
  );
}

export const client = createClient({
  serviceDomain,
  apiKey,
});

export type NewsCategory =
  | "お知らせ"
  | "研究"
  | "論文"
  | "受賞"
  | "イベント"
  | "ゼミ";

export type NewsItem = {
  id: string;
  title: string;
  date: string;
  category: NewsCategory[];
  body?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};

export type PublicationCategory =
  | "論文"
  | "MISC"
  | "書籍等出版物"
  | "研究課題";

export type PublicationItem = {
  id: string;
  title: string;
  authors: string;
  year: number;
  date?: string;
  category: PublicationCategory[];
  publication?: string;
  details?: string;
  url?: string;
  startYear?: number;
  endYear?: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};

type MicroCMSListResponse<T> = {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
};

export async function getNewsList(): Promise<NewsItem[]> {
  const data = await client.get<MicroCMSListResponse<NewsItem>>({
    endpoint: "news",
    queries: {
      orders: "-date",
      limit: 100,
    },
  });

  return data.contents;
}

export async function getNewsDetail(id: string): Promise<NewsItem> {
  return client.get<NewsItem>({
    endpoint: "news",
    contentId: id,
  });
}

export async function getPublicationsList(): Promise<PublicationItem[]> {
  const data = await client.get<MicroCMSListResponse<PublicationItem>>({
    endpoint: "publications",
    queries: {
      orders: "-year,-date",
      limit: 100,
    },
  });

  return data.contents;
}

export function groupPublicationsByYear(
  publications: PublicationItem[],
): Map<number, PublicationItem[]> {
  const grouped = new Map<number, PublicationItem[]>();

  for (const pub of publications) {
    const existing = grouped.get(pub.year) ?? [];

    existing.push(pub);

    grouped.set(pub.year, existing);
  }

  return grouped;
}