export interface IQuery {
  limit?: number;
  page?: number;
  filter?: Record<string, any>;
  filterOr?: Record<string, any>;
  search?: string;
  // search?: Record<string, any>;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: IPagedMeta;
}

interface IPagedMeta {
  total: number;
  page: number;
  limit: number;
  count: number;
  prev: boolean | number;
  next: boolean | number;
  pages: number;
  totalRecords: number;
}

export enum UseCaseType {
  TRIGGER = 'trigger',
  ACTION = 'action',
  CHECK = 'check',
  AUTOMATION = 'automation',
}
export abstract class UseCase<T = any> {
  abstract execute(...args: any[]): Promise<T>;
  type?: UseCaseType = UseCaseType.ACTION;
}
