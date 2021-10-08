import { ShoppingCartService } from '@app/shopping-cart/services/shopping-cart/shopping-cart.service';
import { User } from '@app/user/entities/user.entity';
import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { userInfo } from 'os';

// TODO need customer implementation

@Controller('shopping-cart')
export class ShoppingCartController {
  constructor(private readonly shoppingCartService: ShoppingCartService) {}
  // Get all items in CartItem
  @Get()
  async findAllItems(): Promise<string> {
    return 'all items';
  }

  // Get one item in CartItem
  @Get(':itemId')
  async findOneItem(@Param('itemId') itemId: String): Promise<string> {
    return 'return one item with this id';
  }

  // add item in CartItem
  @Post('addItem')
  async addItem(test: Express.Request & Request) {
    //const userId = this.getUserId(test);
    return 'test';
  }

  // remove item from CartItem
  @Post('removeItem')
  async removeItem(test: Express.Request & Request) {
    return 'remove item';
  }

  // test pour voir si on recupere l'id de user

  @Post()
  async getUserId(@Req() req: Express.Request & Request): Promise<User> {
    if (!req.user) {
      throw new NotFoundException('User not found');
    }
    return req.user['id'];
    //return this.shoppingCartService.getIdTokenUser(req.user);
  }
}
