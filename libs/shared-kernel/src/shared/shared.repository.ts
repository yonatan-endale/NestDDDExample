import {
  EntityManager,
  EntityRepository,
  AnyEntity,
  QueryOrder,
  FilterQuery,
} from '@mikro-orm/postgresql';
import { QueryDto } from './query.dto';
import { PaginatedResponse } from './PaginatedResponse';

export class ExtendedEntityRepository<
  T extends object,
> extends EntityRepository<T> {
  async findPaginated(
    query: QueryDto,
    entityAttributes: string[],
    dtoMapper?: (entity: T) => any,
  ): Promise<any> {
    const filter = query.filter || {};
    const orderBy: { [key: string]: QueryOrder }[] = [];

    if (query.orderBy) {
      const orderKey = typeof query.orderBy === 'string' ? query.orderBy : 'id';
      const orderDirection =
        query.ascending === true ? QueryOrder.ASC : QueryOrder.DESC;
      orderBy.push({ [orderKey]: orderDirection });
    }

    const limit = query.size ?? 10;
    const offset = query.page_number ?? 0;

    const [result, count] = await this.em.findAndCount(
      this.entityName,
      { ...(filter as FilterQuery<T>) },
      {
        populate: entityAttributes as any,
        limit,
        offset,
        orderBy,
      },
    );

    const mappedResult = dtoMapper ? result.map(dtoMapper) : result;
    const paginatedResponse = await PaginatedResponse<any>(
      Promise.resolve(mappedResult),
      query,
      count,
    );
    return paginatedResponse;
  }
  persist(entity: AnyEntity | AnyEntity[]): EntityManager {
    return this.em.persist(entity);
  }

  async persistAndFlush(entity: AnyEntity | AnyEntity[]): Promise<void> {
    await this.em.persistAndFlush(entity);
  }

  remove(entity: AnyEntity): void {
    this.em.remove(entity);
  }

  async removeAndFlush(entity: AnyEntity): Promise<void> {
    await this.em.removeAndFlush(entity);
  }

  async flush(): Promise<void> {
    return this.em.flush();
  }
}
