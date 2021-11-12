import { AuthGuard } from '@nestjs/passport';
import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Permission } from '@app/user/enums/permission.enum';
import { PERMISSIONS_KEY } from './decorators/granted.decorator';
import { ADMIN_AUTHENTICATED_KEY } from '@app/auth/admin/guard/decorators/admin-authenticated.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('admin') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  handleRequest(err, user, info, context: ExecutionContext) {
    console.log('ADMIN_GUARD');
    const requiresAuth = this.reflector.getAllAndOverride<boolean>(
      ADMIN_AUTHENTICATED_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (requiresAuth && !user) {
      throw new UnauthorizedException('Unauthenticated');
    }
    const requiredPermissions = this.reflector.getAllAndOverride<Permission[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredPermissions) {
      return true;
    }

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
