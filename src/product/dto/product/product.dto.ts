import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsUUID,
  Length,
} from 'class-validator';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { Product } from '@app/product/entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCategory } from '@app/product/entities/product-category.entity';
import { TaxRuleGroup } from '@app/product/entities/tax-rule-group.entity';
import { Picture } from '@app/file/entities/picture.entity';

export class ProductDto {
  @ApiProperty({ required: false })
  @Length(2, 255)
  title?: string;

  @ApiProperty({ required: false })
  @Length(2, 255)
  reference?: string;

  @ApiProperty({ required: false })
  @Length(10)
  description?: string;

  @ApiProperty({ required: false })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  price?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsPositive()
  quantity?: number;

  @ApiProperty({ required: false })
  @IsUUID()
  @IsOptional()
  categoryId?: string;

  @ApiProperty({ required: false })
  @IsUUID()
  @IsOptional()
  taxRuleGroupId?: string;

  @ApiProperty({ required: false, description: 'Picture ids' })
  @IsUUID(4, { each: true })
  @IsOptional()
  picturesId?: string[] = [];

  @ApiProperty({ required: false, description: 'Picture id for the thumbnail' })
  @IsUUID()
  @IsOptional()
  thumbnailId?: string;
}

@Injectable()
export class ParseProductDto implements PipeTransform {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductCategory)
    private readonly productCategoryRepository: Repository<ProductCategory>,
    @InjectRepository(TaxRuleGroup)
    private readonly taxRuleGroupRepository: Repository<TaxRuleGroup>,
    @InjectRepository(Picture)
    private readonly pictureRepository: Repository<Picture>,
  ) {}

  async transform(value: ProductDto): Promise<Product> {
    if (!value.picturesId) {
      value.picturesId = [];
    }

    let category;
    try {
      category = await this.productCategoryRepository.findOneOrFail({
        where: { id: value.categoryId },
      });
    } catch {
      throw new NotFoundException(
        `Category does not exist at id : ${value.categoryId}`,
      );
    }
    delete value.categoryId;

    let taxRuleGroup;
    try {
      taxRuleGroup = await this.taxRuleGroupRepository.findOneOrFail({
        where: { id: value.taxRuleGroupId },
      });
    } catch {
      throw new NotFoundException(
        `Tax Rule Group does not exist at id : ${value.taxRuleGroupId}`,
      );
    }
    delete value.taxRuleGroupId;

    let pictures;
    try {
      pictures = await this.pictureRepository.findByIds(value.picturesId);
    } catch (error) {
      throw new BadRequestException(error);
    }

    let thumbnail;
    try {
      thumbnail = await this.pictureRepository.findOneOrFail({
        where: {
          id: value.thumbnailId,
        },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }

    delete value.picturesId;
    delete value.thumbnailId;
    return {
      ...value,
      category,
      taxRuleGroup,
      pictures,
      thumbnail,
    };
  }
}
