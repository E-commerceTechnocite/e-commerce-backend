import { Test, TestingModule } from '@nestjs/testing';
import { CartItemService } from './cart-item.service';
import { mock } from 'jest-mock-extended';
import { Repository } from 'typeorm';
import { Product } from '@app/product/entities/product.entity';
import { ShoppingCart } from '@app/shopping-cart/entities/shopping-cart.entity';
import { CartItem } from '@app/shopping-cart/entities/cart-item.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('CartItemService', () => {
  let service: CartItemService;

  const productRepo = mock<Repository<Product>>();
  const shoppingCartRepo = mock<Repository<ShoppingCart>>();
  const cartItemRepo = mock<Repository<CartItem>>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartItemService,
        { provide: getRepositoryToken(Product), useValue: productRepo },
        {
          provide: getRepositoryToken(ShoppingCart),
          useValue: shoppingCartRepo,
        },
        { provide: getRepositoryToken(CartItem), useValue: cartItemRepo },
      ],
    }).compile();

    service = module.get<CartItemService>(CartItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
