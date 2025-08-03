import { Category } from '$/multitenant-ecommerce-cms/src/payload-types';
import * as qs from 'qs-esm';

export class ContentFetcher {
  baseUrl: string;
  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_CMS_URL || "http://localhost:3000/api";
  }

  async fetch(slug: string, query?: string) {
    const response = await fetch(`${this.baseUrl}/${slug}?${query || ''}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch content from ${slug}`);
    }
    return await response.json();
  }

  async fetchCategories(): Promise<Array<Omit<Category, 'subcategories'> & {subcategories: string[] | Category[]}>> {
    return this.fetch("categories", qs.stringify({
      where: {
        parent: {
          exists: false
        },
        depth: 1,
        pagination: false
      },
      depth: 1,
      sort: 'name',
    }));
  }
}