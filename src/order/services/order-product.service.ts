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
import { AddressCustomer } from '@app/customer/adress/entity/customer-address.entity';
import { OrderProductCreateDto } from '../dto/order-create.dto';

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

  async createOrderProduct(data: OrderProductCreateDto): Promise<void> {
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

    let orderCartItem: Order = {
      status: 0,
      paymentType: 0,
      customer,
      address: customer.addressCustomers[0],
    };

    const order = await this.creatreOrder(orderCartItem);
    const orderProducts = [];
    if (!order) {
      throw new NotFoundException(`Order  not found at id ${customerId}`);
    }
    cartItem.forEach((item) => {
      const orderProduct: OrderProduct = {
        quantity: item.quantity,
        product: item.product,
        order,
      };
      orderProducts.push(orderProduct);
    });

    console.log(order);

    await this.orderRepositoryProduct.save(orderProducts);

    await this.orderRepository.save(order);

    // supprimer l'ordere dans la table cartItem
    await cartItem.forEach((item) => {
      this.cartItemRepository.remove(item);
    });

    /* if (!result) {
      throw new NotFoundException(`Cart item not found or already deleted`);
    } */
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
  async getCartItem(shoppingCartId): Promise<CartItem[]> {
    try {
      return this.cartItemRepository.find({
        where: { shoppingCart: { id: shoppingCartId } },
        relations: ['product'],
      });
    } catch (err) {
      throw new NotFoundException("Customer doesn't exist !");
    }
  }

  //
  async getOrder(customerId): Promise<Order> {
    try {
      //
      const order = await getRepository(Order)
        .createQueryBuilder('myorder')
        .where('myorder.CustomerId =:customerId', {
          customerId: customerId,
        })
        .getOne();

      return order;
    } catch (err) {
      throw new NotFoundException("order  doesn't exist  for this customer!");
    }
  }

  async creatreOrder(orderCartItem): Promise<Order> {
    return await this.orderRepository.save(orderCartItem);
  }
}
