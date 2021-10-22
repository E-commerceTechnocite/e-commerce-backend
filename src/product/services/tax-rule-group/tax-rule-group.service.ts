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
import { UpdateTaxRuleGroupDto } from '@app/product/dto/tax-rule-group/update-tax-rule-group.dto';
import { Product } from '@app/product/entities/product.entity';
import { TaxRule } from '@app/product/entities/tax-rule.entity';

@Injectable()
export class TaxRuleGroupService
  implements
    CrudServiceInterface<TaxRuleGroup, TaxRuleGroupDto, UpdateTaxRuleGroupDto>,
    PaginatorInterface<TaxRuleGroup>
{
  constructor(
    @InjectRepository(TaxRuleGroup)
    private readonly taxRuleGroupRepository: Repository<TaxRuleGroup>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(TaxRule)
    private readonly taxRuleRepository: Repository<TaxRule>,
  ) {}
  deleteFromId(id: string | number): Promise<void> {
    throw new Error('Method not implemented.');
  }

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
    let target;
    try {
      target = await this.taxRuleGroupRepository.findOneOrFail({
        where: { id: id },
      });
    } catch (err) {
      console.log(err);
      throw new NotFoundException(`Entity does not exist at id : ${id}`);
    }
    return target;
  }

  findAll(): Promise<any[]> {
    return this.taxRuleGroupRepository
      .createQueryBuilder('tax_rule_group')
      .select(['tax_rule_group.id', 'tax_rule_group.name'])
      .getMany();
  }

  async create(entity: TaxRuleGroupDto): Promise<TaxRuleGroup> {
    const target: TaxRuleGroup = {
      ...entity,
    };
    return await this.taxRuleGroupRepository.save(target).catch(() => {
      throw new BadRequestException();
    });
  }

  async update(
    id: string | number,
    entity: UpdateTaxRuleGroupDto,
  ): Promise<void> {
    let taxRuleGroup;
    try {
      taxRuleGroup = await this.taxRuleGroupRepository.findOneOrFail({
        where: { id: id },
      });
    } catch {
      throw new NotFoundException(`Tax Rule Group not found at id : ${id}`);
    }
    const target: TaxRuleGroup = {
      ...taxRuleGroup,
      ...entity,
    };

    await this.taxRuleGroupRepository.save(target);
  }

  async deleteWithId(id: string | number): Promise<any[]> {
    let target;
    try {
      target = await this.taxRuleGroupRepository.findOneOrFail({
        where: { id: id },
      });
    } catch {
      throw new BadRequestException(
        `TaxRuleGroup not found or already deleted at id : ${id}`,
      );
    }

    const products = {
      entityType: 'Product',
      products: await this.productRepository
        .createQueryBuilder('product')
        .where('product.tax_rule_group_id=:id', { id: id })
        .getMany(),
    };

    const taxRules = {
      entityType: 'TaxRule',
      taxRules: await this.taxRuleRepository
        .createQueryBuilder('tax_rule')
        .where('tax_rule.taxRuleGroupId=:id', { id: id })
        .getMany(),
    };

    await this.taxRuleGroupRepository.delete(id);

    return [taxRules, products];
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
