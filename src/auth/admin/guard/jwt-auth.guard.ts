import { AuthGuard } from '@nestjs/passport';
import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Permission } from '@app/user/enums/permission.enum';
import { PERMISSIONS_KEY } from '../granted.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  handleRequest(err, user, info, context: ExecutionContext) {
    const requiredPermissions = this.reflector.getAllAndOverride<Permission[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredPermissions) {
      return true;
    }

    console.log(user);
    if (!user) {
      throw new UnauthorizedException('Unauthenticated');
    }

    const canActivate = requiredPermissions.some((permission) =>
      user.role?.permissions.includes(permission),
    );
    if (!canActivate) {
      throw new ForbiddenException('Unauthorized');
    }

    return user;
  }
}
