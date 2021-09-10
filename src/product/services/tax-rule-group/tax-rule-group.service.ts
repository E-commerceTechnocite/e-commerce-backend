import { CrudServiceInterface } from '@app/interfaces/crud-service.interface';
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
    CrudServiceInterface<TaxRuleGroup, TaxRuleGroupDto, TaxRuleGroupDto>
{
  constructor(
    @InjectRepository(TaxRuleGroup)
    private readonly taxRuleGroupRepository: Repository<TaxRuleGroup>,
  ) {}

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

  async create(entity: TaxRuleGroupDto): Promise<void> {
    const target: TaxRuleGroup = {
      ...entity,
    };
    await this.taxRuleGroupRepository.save(target).catch(() => {
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
