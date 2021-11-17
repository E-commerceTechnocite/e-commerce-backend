import { GenericRepository } from '@app/shared/repositories/generic.repository';
import { CartItem } from '@app/shopping-cart/entities/cart-item.entity';
import { EntityRepository } from 'typeorm';

@EntityRepository(CartItem)
export class CartItemRepository extends GenericRepository<CartItem> {}
