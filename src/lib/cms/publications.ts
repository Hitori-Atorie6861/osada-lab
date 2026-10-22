import { client } from "./client";
import type { MicroCMSListResponse, PublicationItem } from "./types";

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
