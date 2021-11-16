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
import { UpdateTaxRuleGroupDto } from '@app/product/dto/tax-rule-group/update-tax-rule-group.dto';
import { TaxRuleGroupRepository } from '@app/product/repositories/tax-rule-group/tax-rule-group.repository';
import { ProductRepository } from '@app/product/repositories/product/product.repository';
import { TaxRuleRepository } from '@app/product/repositories/tax-rule/tax-rule.repository';

@Injectable()
export class TaxRuleGroupService
  implements
    CrudServiceInterface<TaxRuleGroup, TaxRuleGroupDto, UpdateTaxRuleGroupDto>,
    PaginatorInterface<TaxRuleGroup>
{
  constructor(
    @InjectRepository(TaxRuleGroupRepository)
    private readonly taxRuleGroupRepository: TaxRuleGroupRepository,
    @InjectRepository(ProductRepository)
    private readonly productRepository: ProductRepository,
    @InjectRepository(TaxRuleRepository)
    private readonly taxRuleRepository: TaxRuleRepository,
  ) {}

  deleteFromId(id: string | number): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async getPage(
    index: number,
    limit: number,
    opts?: PaginationOptions,
  ): Promise<PaginationDto<TaxRuleGroup>> {
    return await this.taxRuleGroupRepository.findAndPaginate(index, limit, {
      ...opts,
    });
  }

  async find(id: string | number): Promise<TaxRuleGroup> {
    let target;
    try {
      target = await this.taxRuleGroupRepository.findOneOrFail({
        where: { id: id },
      });
    } catch {
      throw new NotFoundException(`TaxRuleGroup does not exist at id : ${id}`);
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
