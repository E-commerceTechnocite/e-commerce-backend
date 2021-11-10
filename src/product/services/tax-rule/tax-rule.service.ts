import { PaginationMetadataDto } from '@app/shared/dto/pagination/pagination-metadata.dto';
import { PaginationDto } from '@app/shared/dto/pagination/pagination.dto';
import { CrudServiceInterface } from '@app/shared/interfaces/crud-service.interface';
import {
  PaginationOptions,
  PaginatorInterface,
} from '@app/shared/interfaces/paginator.interface';
import { TaxRuleDto } from '@app/product/dto/tax-rule/tax-rule.dto';
import { Country } from '@app/product/entities/country.entity';
import { TaxRuleGroup } from '@app/product/entities/tax-rule-group.entity';
import { TaxRule } from '@app/product/entities/tax-rule.entity';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaxRuleUpdateDto } from '@app/product/dto/tax-rule/tax-rule-update.dto';

@Injectable()
export class TaxRuleService
  implements
    CrudServiceInterface<TaxRule, TaxRuleDto, TaxRuleUpdateDto>,
    PaginatorInterface<TaxRule>
{
  constructor(
    @InjectRepository(TaxRule)
    private readonly taxRuleRepository: Repository<TaxRule>,

    @InjectRepository(TaxRuleGroup)
    private readonly taxRuleGroupRepository: Repository<TaxRuleGroup>,

    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
  ) {}

  async getPage(
    index: number,
    limit: number,
    opts?: PaginationOptions,
  ): Promise<PaginationDto<TaxRule>> {
    const count = await this.taxRuleRepository.count();
    const meta = new PaginationMetadataDto(index, limit, count);
    if (meta.currentPage > meta.maxPages) {
      throw new NotFoundException('This page of tax rules does not exist');
    }

    const data = await this.taxRuleRepository.find({
      skip: index * limit - limit,
      take: limit,
      order: { [opts?.orderBy ?? 'createdAt']: opts?.order ?? 'DESC' },
    });

    return {
      data,
      meta,
    };
  }

  async find(id: string | number): Promise<TaxRule> {
    let target;
    try {
      target = await this.taxRuleRepository.findOneOrFail({
        where: { id: id },
      });
    } catch (err) {
      console.log(err);
      throw new NotFoundException(`Entity does not exist at id : ${id}`);
    }
    return target;
  }

  findAll(): Promise<any[]> {
    return this.taxRuleRepository
      .createQueryBuilder('tax_rule')
      .select(['tax_rule.id', 'tax_rule.description'])
      .getMany();
  }

  async create(entity: TaxRuleDto): Promise<TaxRule> {
    let taxRuleGroup;
    try {
      taxRuleGroup = await this.taxRuleGroupRepository.findOneOrFail({
        where: { id: entity.taxRuleGroupId },
      });
    } catch {
      throw new NotFoundException(
        `Tax Rule Group does not exists at id : ${entity.taxRuleGroupId}`,
      );
    }
    delete entity.taxRuleGroupId;

    let country;
    try {
      country = await this.countryRepository.findOneOrFail({
        where: { id: entity.countryId },
      });
    } catch {
      throw new NotFoundException(
        `Country does not exist at id : ${entity.countryId}`,
      );
    }
    delete entity.countryId;

    const target: TaxRule = {
      ...entity,
      taxRuleGroup,
      country,
    };

    const count = await this.taxRuleRepository
      .createQueryBuilder('t-r')
      .where({ taxRuleGroup: target.taxRuleGroup })
      .andWhere({ country: target.country })
      .getCount();

    if (count > 0) {
      throw new BadRequestException('This TaxRule aldready exists');
    } else {
      return await this.taxRuleRepository.save(target);
    }
  }

  async update(id: string | number, entity: TaxRuleUpdateDto): Promise<void> {
    let taxRule;
    try {
      taxRule = await this.taxRuleRepository.findOneOrFail({
        where: { id: id },
      });
    } catch {
      throw new NotFoundException(`Tax Rule does not exist at id : ${id}`);
    }

    const target: TaxRule = {
      ...taxRule,
      ...entity,
    };

    await this.taxRuleRepository.save(target);
  }

  async deleteFromId(id: string | number): Promise<void> {
    const result = await this.taxRuleRepository.delete(id);
    if (result.affected < 1) {
      throw new BadRequestException(`Tax rule not found or already deleted`);
    }
  }

  async delete(entity: TaxRule): Promise<void> {
    const result = await this.taxRuleRepository.delete(entity);
    if (result.affected < 1) {
      throw new BadRequestException(`Tax rule not found or already deleted`);
    }
  }
}
