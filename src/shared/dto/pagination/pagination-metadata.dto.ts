import { ApiProperty } from '@nestjs/swagger';

export class PaginationMetadataDto {
  constructor(index: number, limit: number, count: number) {
    const maxPages = Math.ceil(count / limit);
    this.currentPage = +index;
    this.limit = +limit;
    this.nextPage = +index + 1 <= maxPages ? +index + 1 : null;
    this.prevPage = +index - 1 > 0 ? +index - 1 : null;
    this.maxPages = maxPages;
    this.count = count;
  }

  @ApiProperty()
  currentPage: number;
  @ApiProperty()
  maxPages: number;
  @ApiProperty()
  limit: number;
  @ApiProperty()
  prevPage: number;
  @ApiProperty()
  nextPage: number;
  @ApiProperty()
  count: number;
}
