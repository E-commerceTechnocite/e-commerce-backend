import { OrderProduct } from '@app/order/entities/order-product.entity';
import { GenericRepository } from '@app/shared/repositories/generic.repository';
import { EntityRepository } from 'typeorm';

@EntityRepository(OrderProduct)
export class OrderProductRepository extends GenericRepository<OrderProduct> {}
