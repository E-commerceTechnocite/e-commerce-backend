import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Role, ROLES_KEY } from '@app/auth/roles.decorator';
import { JwtService } from '@nestjs/jwt';
import { User } from '@app/user/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwt: JwtService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const token = context
      .switchToHttp()
      .getRequest()
      .headers.authorization?.split(' ')[1];
    if (!token) {
      throw new ForbiddenException('Unauthenticated');
    }

    let user: User;
    try {
      user = this.jwt.verify(token);
    } catch (err) {
      throw new BadRequestException(err);
    }

    console.log(user);
    const canActivate = requiredRoles.some((role) =>
      user.roles?.includes(role),
    );
    if (!canActivate) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
