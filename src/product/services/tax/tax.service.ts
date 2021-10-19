import { PaginationMetadataDto } from '@app/shared/dto/pagination/pagination-metadata.dto';
import { PaginationDto } from '@app/shared/dto/pagination/pagination.dto';
import { CrudServiceInterface } from '@app/shared/interfaces/crud-service.interface';
import {
  PaginationOptions,
  PaginatorInterface,
} from '@app/shared/interfaces/paginator.interface';
import { TaxDto } from '@app/product/dto/tax/tax.dto';
import { Tax } from '@app/product/entities/tax.entity';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TaxService
  implements CrudServiceInterface<Tax, TaxDto, TaxDto>, PaginatorInterface<Tax>
{
  constructor(
    @InjectRepository(Tax)
    private readonly taxRepository: Repository<Tax>,
  ) {}

  async getPage(
    index: number,
    limit: number,
    opts?: PaginationOptions,
  ): Promise<PaginationDto<Tax>> {
    const count = await this.taxRepository.count();
    const meta = new PaginationMetadataDto(index, limit, count);
    if (meta.currentPage > meta.maxPages) {
      throw new NotFoundException('This page of taxes does not exist');
    }

    const query = this.taxRepository.createQueryBuilder('t');
    if (opts) {
      const { orderBy } = opts;
      await query.orderBy(orderBy ?? 'id');
    }
    const data = await query

      .skip(index * limit - limit)
      .take(limit)
      .getMany();
    return {
      data,
      meta,
    };
  }

  async find(id: string | number): Promise<Tax> {
    let tax;
    try {
      tax = await this.taxRepository.findOneOrFail({ where: { id: id } });
    } catch {
      throw new NotFoundException(`Entity doest exist at id : ${id}`);
    }
    return tax;
  }

  findAll(): Promise<any[]> {
    return this.taxRepository
      .createQueryBuilder('tax')
      .select(['tax.id', 'tax.rate'])
      .getMany();
  }

  async create(entity: TaxDto): Promise<Tax> {
    const target: Tax = {
      ...entity,
    };
    return await this.taxRepository.save(target).catch(() => {
      throw new BadRequestException();
    });
  }

  async update(id: string | number, entity: TaxDto): Promise<void> {
    let tax;
    try {
      tax = await this.taxRepository.findOneOrFail({ where: { id: id } });
    } catch {
      throw new NotFoundException(`Tax does not exist at id : ${id}`);
    }

    const target: Tax = {
      ...tax,
      ...entity,
    };

    await this.taxRepository.save(target);
  }

  async deleteFromId(id: string | number): Promise<void> {
    const result = await this.taxRepository.delete(id);
    if (result.affected < 1) {
      throw new BadRequestException('Tax not found or already deleted');
    }
  }

  async delete(entity: Tax): Promise<void> {
    const result = await this.taxRepository.delete(entity);
    if (result.affected < 1) {
      throw new BadRequestException('Tax not found or already deleted');
    }
  }
}
