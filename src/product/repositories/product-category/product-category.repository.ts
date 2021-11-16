import { GenericRepository } from '@app/shared/repositories/generic.repository';
import { ProductCategory } from '@app/product/entities/product-category.entity';
import { EntityRepository } from 'typeorm';

@EntityRepository(ProductCategory)
export class ProductCategoryRepository extends GenericRepository<ProductCategory> {}
