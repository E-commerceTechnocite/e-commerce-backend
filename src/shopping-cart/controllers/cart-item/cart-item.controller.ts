import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CartItemService } from '@app/shopping-cart/services/cart-item/cart-item.service';
import { CartItemCreateDto } from '@app/shopping-cart/dto/cart-item/cart-item-create.dto';
import { CartItemUpdateDto } from '@app/shopping-cart/dto/cart-item/cart-item-update.dto';
import { CartItem } from '@app/shopping-cart/entities/cart-item.entity';
import { PaginationDto } from '@app/shared/dto/pagination/pagination.dto';
import { ApiTags } from '@nestjs/swagger';
import {
  ApiOkPaginatedResponse,
  ApiPaginationQueries,
} from '@app/shared/swagger';

@ApiTags('Cart')
@Controller({ path: 'cart-item', version: '1' })
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  @Get(':id')
  async find(id: string): Promise<CartItem> {
    return await this.cartItemService.find(id);
  }

  @ApiPaginationQueries()
  @ApiOkPaginatedResponse(CartItem)
  @Get()
  async paginate(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('orderBy') orderBy = null,
    @Query('order') order: 'DESC' | 'ASC' = null,
  ): Promise<PaginationDto<CartItem>> {
    return await this.cartItemService.getPage(page, limit, { orderBy, order });
  }
  // old code
  /*  @Post()
  async create(@Body() cartItem: CartItemCreateDto): Promise<CartItem> {
    return await this.cartItemService.create(cartItem);
  }
 */
  // Code added  by  Brahim
  @Post()
  async create(@Body() cartItem: CartItemCreateDto): Promise<CartItem> {
    return await this.cartItemService.create(cartItem);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() cartItem: CartItemUpdateDto,
  ): Promise<void> {
    return await this.cartItemService.update(id, cartItem);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.cartItemService.deleteFromId(id);
  }
}
