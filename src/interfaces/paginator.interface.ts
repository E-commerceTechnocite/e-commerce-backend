import { PaginationDto } from '@app/dto/pagination/pagination.dto';

export interface PaginationOptions {
  orderBy?: string;
}

export interface PaginatorInterface<T> {
  getPage(
    index: number,
    limit: number,
    opts?: PaginationOptions,
  ): Promise<PaginationDto<T>>;
}