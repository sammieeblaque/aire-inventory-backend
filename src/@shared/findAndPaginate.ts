import { IQuery } from 'src/@types';
import { Repository } from 'typeorm';

export const findAndPaginate = async <T>(
  query: IQuery,
  repository: Repository<T>,
  where?: Record<string, any>,
) => {
  query.page = Number(query.page) > 1 ? Number(query.page) - 1 : 0;
  const take = Number(query.limit) || 10;
  const skip = query.page * take || 0;

  const [result, total] = await repository.findAndCount({
    take: take,
    skip: skip,
    where,
  });

  const numberOfPages = Math.ceil(total / take);

  return {
    data: result,
    meta: {
      total: total,
      page: query.page + 1,
      limit: +query.limit,
      count: result.length,
      pages: numberOfPages,
      next: query.page < numberOfPages ? query.page + 1 : false,
      prev: query.page > 1 ? query.page - 1 : false,
      totalRecords: total,
    },
  };
};
