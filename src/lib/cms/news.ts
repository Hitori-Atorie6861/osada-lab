import { client } from "./client";
import type { MicroCMSListResponse, NewsItem } from "./types";

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
