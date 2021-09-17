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
import { Tax } from '@app/product/entities/tax.entity';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaxRuleUpdateDto } from '@app/product/dto/tax-rule/tax-rule-update.dto';
import { GetCheckDeleteEntityIdService } from '@app/shared/services/get-check-delete-entity-id.service';

@Injectable()
export class TaxRuleService
  implements
    CrudServiceInterface<TaxRule, TaxRuleDto, TaxRuleUpdateDto>,
    PaginatorInterface<TaxRule>
{
  constructor(
    @InjectRepository(TaxRule)
    private readonly taxRuleRepository: Repository<TaxRule>,

    @InjectRepository(Tax)
    private readonly taxRepository: Repository<Tax>,

    @InjectRepository(TaxRuleGroup)
    private readonly taxRuleGroupRepository: Repository<TaxRuleGroup>,

    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,

    private readonly getCheckDeleteService: GetCheckDeleteEntityIdService,
  ) {}

  async getPage(
    index: number,
    limit: number,
    opts?: PaginationOptions,
  ): Promise<PaginationDto<TaxRule>> {
    const count = await this.taxRuleRepository.count();
    const meta = new PaginationMetadataDto(index, limit, count);
    if (meta.currentPage > meta.maxPages) {
      throw new NotFoundException('This page of products does not exist');
    }
    const query = this.taxRuleRepository.createQueryBuilder('tr');
    if (opts) {
      const { orderBy } = opts;
      await query.orderBy(orderBy ?? 'id');
    }
    const data = await query
      .leftJoinAndMapOne('tr.tax', Tax, 't', 'tr.tax_id = t.id')
      .leftJoinAndMapOne(
        'tr.taxRuleGroup',
        TaxRuleGroup,
        'trg',
        'tr.tax_rule_group_id = trg.id',
      )
      .leftJoinAndMapOne('tr.country', Country, 'c', 'tr.country_id = c.id')
      .skip(index * limit - limit)
      .take(limit)
      .getMany();

    return {
      data,
      meta,
    };
  }

  async find(id: string | number): Promise<TaxRule> {
    const target = await this.taxRuleRepository.findOne(id);
    if (!target) {
      throw new NotFoundException();
    }
    return target;
  }

  findAll(): Promise<TaxRule[]> {
    return this.taxRuleRepository.find();
  }

  async create(entity: TaxRuleDto): Promise<TaxRule> {
    const tax = await this.getCheckDeleteService.getEntity<Tax>(
      this.taxRepository,
      entity,
      'taxId',
    );

    const taxRuleGroup =
      await this.getCheckDeleteService.getEntity<TaxRuleGroup>(
        this.taxRuleGroupRepository,
        entity,
        'taxRuleGroupId',
      );

    const country = await this.countryRepository.findOne(entity.countryId);
    if (!country) {
      throw new BadRequestException(
        `Country not found at id ${entity.countryId}`,
      );
    }
    delete entity.countryId;

    const target: TaxRule = {
      ...entity,
      tax,
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
    const tax = await this.taxRepository.findOne(entity.taxId);
    if (!tax) {
      throw new BadRequestException(`Tax not found at id ${entity.taxId}`);
    }
    delete entity.taxId;

    const taxRule = await this.taxRuleRepository.findOne(id);
    if (!taxRule) {
      throw new BadRequestException(`TaxRule not found with id ${id}`);
    }

    const target: TaxRule = {
      ...taxRule,
      ...entity,
      tax,
    };

    await this.taxRuleRepository.update(id, target);
  }

  async deleteFromId(id: string | number): Promise<void> {
    const result = await this.taxRuleRepository.delete(id);
    if (result.affected < 1) {
      throw new BadRequestException(`Product not found or already deleted`);
    }
  }

  async delete(entity: TaxRule): Promise<void> {
    const result = await this.taxRuleRepository.delete(entity);
    if (result.affected < 1) {
      throw new BadRequestException(`Product not found or already deleted`);
    }
  }
}
