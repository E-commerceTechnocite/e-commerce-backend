import { Customer } from '@app/customer/entities/customer/customer.entity';
import { ShoppingCart } from '@app/shopping-cart/entities/shopping-cart.entity';
import { Injectable, NotFoundException, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// TODO  shopping cart with customer

@Injectable()
export class ShoppingCartService {
  constructor(
    @InjectRepository(ShoppingCart)
    private readonly shoppingRepository: Repository<ShoppingCart>,
  ) {}

  // permer de creer un enregistrement dans la table shoppingCarte des qu'un enregistrement est inseré dans la table customer
  async createShoppingCart(): Promise<ShoppingCart> {
    let shop = new ShoppingCart();
    return this.shoppingRepository.save(shop);
  }
}
