import { PaginationDto } from '@app/shared/dto/pagination/pagination.dto';
import { IsPositiveIntPipe } from '@app/shared/pipes/is-positive-int.pipe';
import { ApiOkPaginatedResponse } from '@app/shared/swagger';
import { ShoppingCartDto } from '@app/shopping-cart/dto/cart-item/shopping-cart/shopping-cart.dto';
import { ShoppingCart } from '@app/shopping-cart/entities/shopping-cart.entity';
import { ShoppingCartService } from '@app/shopping-cart/services/shopping-cart/shopping-cart.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiQuery, ApiResponse } from '@nestjs/swagger';

// TODO need customer implementation

@Controller({ path: 'shopping-cart', version: '1' })
export class ShoppingCartController {
  constructor(private readonly shoppingCartService: ShoppingCartService) {}

  @ApiOkPaginatedResponse(ShoppingCart)
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @Get()
  async find(
    @Query('page', IsPositiveIntPipe) page = 1,
    @Query('limit', IsPositiveIntPipe) limit = 10,
  ): Promise<PaginationDto<ShoppingCart>> {
    return this.shoppingCartService.getPage(page, limit);
  }

  @ApiOkResponse()
  @ApiResponse({ type: ShoppingCart })
  @Get(':id')
  async findById(@Param('id') id: string): Promise<ShoppingCart> {
    return this.shoppingCartService.find(id);
  }

  @ApiBody({ type: ShoppingCartDto, required: false })
  @ApiResponse({ type: null })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() shoppingCart: ShoppingCart): Promise<any> {
    return await this.shoppingCartService.create(shoppingCart);
  }

  @ApiBody({ type: ShoppingCartDto, required: false })
  @ApiResponse({ type: null })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() shoppingCart: ShoppingCartDto,
  ): Promise<any> {
    return this.shoppingCartService.update(id, shoppingCart);
  }

  @ApiResponse({ type: null })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<any> {
    return this.shoppingCartService.deleteFromId(id);
  }
}
