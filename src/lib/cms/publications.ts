
import { client } from "./client";
import type {
  MicroCMSListResponse,
  PublicationItem,
} from "./types";

export type PublicationListItem = Pick<
  PublicationItem,
  | "id"
  | "title"
  | "authors"
  | "year"
  | "date"
  | "category"
  | "publication"
  | "details"
  | "url"
  | "startYear"
  | "endYear"
>;

export async function getPublicationsList(): Promise<
  PublicationListItem[]
> {
  const data = await client.get<
    MicroCMSListResponse<PublicationListItem>
  >({
    endpoint: "publications",
    queries: {
      orders: "-year,-date",
      limit: 100,
      fields: [
        "id",
        "title",
        "authors",
        "year",
        "date",
        "category",
        "publication",
        "details",
        "url",
        "startYear",
        "endYear",
      ],
    },
  });

  return data.contents.map((pub) => ({
    id: pub.id,
    title: pub.title,
    authors: pub.authors,
    year: pub.year,
    date: pub.date,
    category: pub.category,
    publication: pub.publication,
    details: pub.details,
    url: pub.url,
    startYear: pub.startYear,
    endYear: pub.endYear,
  }));
}

export function groupPublicationsByYear(
  publications: PublicationListItem[],
): Map<number, PublicationListItem[]> {
  const grouped = new Map<number, PublicationListItem[]>();

  for (const pub of publications) {
    const existing = grouped.get(pub.year) ?? [];
    existing.push(pub);
    grouped.set(pub.year, existing);
  }

  return grouped;
}
