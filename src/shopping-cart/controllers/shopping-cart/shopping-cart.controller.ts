import { CustomerAuthenticated } from '@app/auth/customer/guard/customer-authenticated.decorator';
import { CustomerJwtAuthGuard } from '@app/auth/customer/guard/customer-jwt-auth.guard';
import { Customer } from '@app/customer/entities/customer/customer.entity';
import { ApiCustomerAuth } from '@app/shared/swagger';
import { ShoppingCart } from '@app/shopping-cart/entities/shopping-cart.entity';
import { ShoppingCartService } from '@app/shopping-cart/services/shopping-cart/shopping-cart.service';
import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

// TODO need customer implementation

@ApiCustomerAuth()
@ApiTags('Shopping-cart')
@Controller('shopping-cart')
@UseGuards(CustomerJwtAuthGuard)
@CustomerAuthenticated()
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

  // cette fonction permet de recuperer l'id de user

  /*  @Post()
  async getUserId(@Req() req: Express.Request & Request): Promise<string> {
    if (!req.user) {
      throw new NotFoundException('User not found');
    }
    //return req.user['id'];
    return this.shoppingCartService.getIdTokenUser(req.user);
  } */
}
