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

export type MicroCMSListResponse<T> = {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
};
