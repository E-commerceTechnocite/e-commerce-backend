import { ShoppingCartService } from '@app/shopping-cart/services/shopping-cart/shopping-cart.service';
import { Controller, Get, Param } from '@nestjs/common';

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
  async findOneItem(@Param('itemId') itemId: string): Promise<string> {
    return 'return one item with this id' + itemId;
  }
  // cette fonction n'est plus utilisée.
  /*  @Post()
  async getUserId(@Req() req: Express.Request & Request): Promise<string> {
    if (!req.user) {
      throw new NotFoundException('User not found');
    }
    //return req.user['id'];
    return this.shoppingCartService.getIdTokenUser(req.user);
  } */
}
