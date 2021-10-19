import { Customer } from '@app/customer/entities/customer/customer.entity';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';

import { OrderProduct } from '../entities/order-product.entity';
import { Order } from '../entities/order.entity';

import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { CartItem } from '@app/shopping-cart/entities/cart-item.entity';
import { Product } from '@app/product/entities/product.entity';

@Injectable()
export class OrderProductService {
  customerRepo: any;
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Customer>,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderProduct)
    private readonly orderRepositoryProduct: Repository<OrderProduct>,
    @Inject(REQUEST)
    private readonly request: Request,
  ) {}

  async createOrderProduct(): Promise<Product> {
    //  recupérer  l'id du customer plus validation
    if (!this.request.user) {
      throw new NotFoundException('User not found !');
    }

    const customerId: Customer = this.request.user['id'];

    // a l' aide de customerId  je recupere le customer
    let customer = await this.getCustomerById(customerId);

    // recupérer shoppingCartId
    let shoppingCartId = customer['shoppingCart'].id;
    // recuperer cartItem

    let cartItem = await this.getCartItem(shoppingCartId);
    //const product = await this.productRepo.findOne(entity.productId);
    if (!cartItem) {
      throw new NotFoundException(
        `cartItem  not found at id ${shoppingCartId}`,
      );
    }

    // recuperer le product
    const product = await this.productRepository.findOne(cartItem['product']);
    if (!product) {
      throw new NotFoundException(
        `Product not found at id ${cartItem['product']}`,
      );
    }

    // recuperer le product
    const order = await this.orderRepository.findOne(customerId);
    if (!order) {
      throw new NotFoundException(`Order  not found at id ${customerId}`);
    }
    return product;
  }

  // cette fonction permet de recupérer le customer par son id
  async getCustomerById(customerId): Promise<Customer> {
    try {
      //
      const customer = await this.customerRepository.findOneOrFail(customerId);
      console.log(customerId);
      return customer;
    } catch (err) {
      console.log(customerId);
      throw new NotFoundException("Customer doesn't exist !");
    }
  }
  // recuperer la cartItem du customer sur base du shoppingCartId
  async getCartItem(shoppingCartId): Promise<CartItem> {
    try {
      //
      const cartItem = getRepository(CartItem)
        .createQueryBuilder('cart')
        .where('cart.shoppingCartId =:shoppingCartId', {
          shoppingCartId: shoppingCartId,
        })
        .getOne();

      return cartItem;
    } catch (err) {
      throw new NotFoundException("Customer doesn't exist !");
    }
  }

  // recuperer la cartItem du customer sur base du shoppingCartId
  async getOrder(customerId): Promise<Order> {
    try {
      //
      const order = getRepository(Order)
        .createQueryBuilder('myorder')
        .where('myorder.idCustomer =:customerId', {
          customerId: customerId,
        })
        .getOne();

      return order;
    } catch (err) {
      throw new NotFoundException("order  doesn't exist  for this customer!");
    }
  }
}
