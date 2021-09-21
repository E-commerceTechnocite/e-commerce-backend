import { PaginationMetadataDto } from '@app/shared/dto/pagination/pagination-metadata.dto';
import { PaginationDto } from '@app/shared/dto/pagination/pagination.dto';
import { CrudServiceInterface } from '@app/shared/interfaces/crud-service.interface';
import {
  PaginationOptions,
  PaginatorInterface,
} from '@app/shared/interfaces/paginator.interface';
import { TaxRuleGroupDto } from '@app/product/dto/tax-rule-group/tax-rule-group.dto';

import { TaxRuleGroup } from '@app/product/entities/tax-rule-group.entity';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TaxRuleGroupService
  implements
    CrudServiceInterface<TaxRuleGroup, TaxRuleGroupDto, TaxRuleGroupDto>,
    PaginatorInterface<TaxRuleGroup>
{
  constructor(
    @InjectRepository(TaxRuleGroup)
    private readonly taxRuleGroupRepository: Repository<TaxRuleGroup>,
  ) {}

  async getPage(
    index: number,
    limit: number,
    opts?: PaginationOptions,
  ): Promise<PaginationDto<TaxRuleGroup>> {
    const count = await this.taxRuleGroupRepository.count();
    const meta = new PaginationMetadataDto(index, limit, count);
    if (meta.currentPage > meta.maxPages) {
      throw new NotFoundException('This page of TaxRuleGroup does not exist');
    }

    const query = this.taxRuleGroupRepository.createQueryBuilder('trg');
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

  async find(id: string | number): Promise<TaxRuleGroup> {
    const taxRuleGroup = await this.taxRuleGroupRepository.findOne(id);
    if (!taxRuleGroup) {
      throw new NotFoundException();
    }
    return taxRuleGroup;
  }

  findAll(): Promise<TaxRuleGroup[]> {
    return this.taxRuleGroupRepository.find();
  }

  async create(entity: TaxRuleGroupDto): Promise<TaxRuleGroup> {
    const target: TaxRuleGroup = {
      ...entity,
    };
    return await this.taxRuleGroupRepository.save(target).catch(() => {
      throw new BadRequestException();
    });
  }

  async update(id: string | number, entity: TaxRuleGroupDto): Promise<void> {
    const target: TaxRuleGroup = {
      name: entity.name,
    };

    const result = await this.taxRuleGroupRepository.update(id, target);
    if (result.affected < 1) {
      throw new BadRequestException(`TaxRuleGroup not found with id ${id}`);
    }
  }

  async deleteFromId(id: string | number): Promise<void> {
    const result = await this.taxRuleGroupRepository.delete(id);
    if (result.affected < 1) {
      throw new BadRequestException(
        'TaxRuleGroup not found or already deleted',
      );
    }
  }

  async delete(entity: TaxRuleGroup): Promise<void> {
    const result = await this.taxRuleGroupRepository.delete(entity);
    if (result.affected < 1) {
      throw new BadRequestException(
        'TaxRuleGroup not found or already deleted',
      );
    }
  }
}
