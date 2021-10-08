import { User } from '@app/user/entities/user.entity';
import { Injectable, Req } from '@nestjs/common';

// TODO wire shopping cart with customer

@Injectable()
export class ShoppingCartService {
  constructor() {}

  async getIdTokenUser(user: User): Promise<User> {
    return user;
  }
}
