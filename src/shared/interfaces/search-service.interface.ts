import { PaginationDto } from '@app/shared/dto/pagination/pagination.dto';

export interface SearchServiceInterface<T> {
  search(
    query: string,
    index: number,
    limit: number,
  ): Promise<PaginationDto<T>>;
}
