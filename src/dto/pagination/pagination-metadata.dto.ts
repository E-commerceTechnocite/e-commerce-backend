import { ApiProperty } from '@nestjs/swagger';

export class PaginationMetadataDto {
  constructor(index: number, limit: number, count: number) {
    this.currentPage = index;
    this.limit = limit;
    this.nextPage = index + 1 <= count ? +index + 1 : null;
    this.prevPage = index - 1 > 0 ? +index - 1 : null;
    this.maxPages = Math.ceil(count / limit);
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
}
