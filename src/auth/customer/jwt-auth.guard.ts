import { AuthGuard } from '@nestjs/passport';
import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  handleRequest(err, customer, info, context: ExecutionContext) {
    console.log(customer);
    if (!customer) {
      throw new UnauthorizedException('Unauthenticated');
    }

    return customer;
  }
}
