import { GenericRepository } from '@app/shared/repositories/generic.repository';
import { Product } from '@app/product/entities/product.entity';
import { EntityRepository } from 'typeorm';

@EntityRepository(Product)
export class ProductRepository extends GenericRepository<Product> {}
