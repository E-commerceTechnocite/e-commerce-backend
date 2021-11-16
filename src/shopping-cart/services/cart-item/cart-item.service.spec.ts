import { Test, TestingModule } from '@nestjs/testing';
import { CartItemService } from './cart-item.service';
import { mock } from 'jest-mock-extended';
import { Repository } from 'typeorm';
import { Product } from '@app/product/entities/product.entity';
import { ShoppingCart } from '@app/shopping-cart/entities/shopping-cart.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Customer } from '@app/customer/entities/customer/customer.entity';
import { REQUEST } from '@nestjs/core';
import { CartItemRepository } from '@app/shopping-cart/repositories/cart-item/cart-item.repository';

describe('CartItemService', () => {
  let service: CartItemService;

  const productRepo = mock<Repository<Product>>();
  const shoppingCartRepo = mock<Repository<ShoppingCart>>();
  const cartItemRepo = mock<CartItemRepository>();
  const customerRepository = mock<Repository<Customer>>();
  const request = mock<Request & Express.Request>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartItemService,
        { provide: getRepositoryToken(Product), useValue: productRepo },
        {
          provide: getRepositoryToken(ShoppingCart),
          useValue: shoppingCartRepo,
        },
        {
          provide: getRepositoryToken(CartItemRepository),
          useValue: cartItemRepo,
        },

        { provide: getRepositoryToken(Customer), useValue: customerRepository },
        { provide: REQUEST, useValue: request },
      ],
    }).compile();

    service = module.get<CartItemService>(CartItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
