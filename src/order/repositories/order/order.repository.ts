import { Order } from '@app/order/entities/order.entity';
import { PaginationDto } from '@app/shared/dto/pagination/pagination.dto';
import { GenericRepository } from '@app/shared/repositories/generic.repository';
import { EntityRepository } from 'typeorm';

@EntityRepository(Order)
export class OrderRepository extends GenericRepository<Order> {
  async paginateOrders(): Promise<PaginationDto<any>> {
    return Promise.resolve(null);
  }
}
