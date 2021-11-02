import { PaginationDto } from '@app/shared/dto/pagination/pagination.dto';

export interface PaginationOptions {
  orderBy?: string;
  order?: 'DESC' | 'ASC';
}

export interface PaginatorInterface<T> {
  getPage(
    index: number,
    limit: number,
    opts?: PaginationOptions,
  ): Promise<PaginationDto<T>>;
}
