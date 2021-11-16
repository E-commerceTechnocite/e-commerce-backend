import { ShoppingCart } from '@app/shopping-cart/entities/shopping-cart.entity';
import { Injectable } from '@nestjs/common';
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
    const shop = new ShoppingCart();
    return this.shoppingRepository.save(shop);
  }
}
