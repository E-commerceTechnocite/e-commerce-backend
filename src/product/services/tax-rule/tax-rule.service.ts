import { PaginationDto } from '@app/shared/dto/pagination/pagination.dto';
import { CrudServiceInterface } from '@app/shared/interfaces/crud-service.interface';
import {
  PaginationOptions,
  PaginatorInterface,
} from '@app/shared/interfaces/paginator.interface';
import { TaxRuleDto } from '@app/product/dto/tax-rule/tax-rule.dto';
import { TaxRule } from '@app/product/entities/tax-rule.entity';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaxRuleUpdateDto } from '@app/product/dto/tax-rule/tax-rule-update.dto';
import { TaxRuleRepository } from '@app/product/repositories/tax-rule/tax-rule.repository';
import { TaxRuleGroupRepository } from '@app/product/repositories/tax-rule-group/tax-rule-group.repository';
import { CountryRepository } from '@app/product/repositories/country/country.repository';

@Injectable()
export class TaxRuleService
  implements
    CrudServiceInterface<TaxRule, TaxRuleDto, TaxRuleUpdateDto>,
    PaginatorInterface<TaxRule>
{
  constructor(
    @InjectRepository(TaxRuleRepository)
    private readonly taxRuleRepository: TaxRuleRepository,

    @InjectRepository(TaxRuleGroupRepository)
    private readonly taxRuleGroupRepository: TaxRuleGroupRepository,

    @InjectRepository(CountryRepository)
    private readonly countryRepository: CountryRepository,
  ) {}

  async getPage(
    index: number,
    limit: number,
    opts?: PaginationOptions,
  ): Promise<PaginationDto<TaxRule>> {
    return await this.taxRuleRepository.findAndPaginate(index, limit, {
      ...opts,
    });
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
