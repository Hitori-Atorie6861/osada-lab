
import { client } from "./client";
import type {
  MicroCMSListResponse,
  NewsItem,
} from "./types";

export type NewsListItem = Pick<
  NewsItem,
  "id" | "title" | "date" | "category"
>;

export async function getNewsList(): Promise<NewsListItem[]> {
  const data = await client.get<
    MicroCMSListResponse<NewsListItem>
  >({
    endpoint: "news",
    queries: {
      orders: "-date",
      limit: 100,
      fields: ["id", "title", "date", "category"],
    },
  });

  return data.contents.map((item) => ({
    id: item.id,
    title: item.title,
    date: item.date,
    category: item.category,
  }));
}

export async function getNewsDetail(
  id: string
): Promise<NewsItem> {
  return client.get<NewsItem>({
    endpoint: "news",
    contentId: id,
  });
}
