import { Repository } from 'typeorm';
import { Product } from '@app/product/product.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductRepository extends Repository<Product> {}
