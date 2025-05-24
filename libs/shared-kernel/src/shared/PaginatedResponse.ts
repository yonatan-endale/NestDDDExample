import { QueryDto } from './query.dto';

export interface PaginatedResponseInterface<T> {
  items: T[];
  totalItems: number;
  page: number;
  size: number;
}
export function PaginatedResponse<T>(
  response: Promise<T[]>,
  query: QueryDto,
  count: number,
): Promise<PaginatedResponseInterface<T>> {
  return response.then((items) => {
    const totalItems = count || items.length;
    const page = query.page_number || 0;
    const size = query.size || 0;

    return {
      items: items,
      totalItems,
      page,
      size,
    };
  });
}
