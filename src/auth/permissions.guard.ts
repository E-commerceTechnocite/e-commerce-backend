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
import { PERMISSIONS_KEY } from '@app/auth/permissions.decorator';
import { JwtService } from '@nestjs/jwt';
import { User } from '@app/user/entities/user.entity';
import { Permission } from '@app/user/enums/permission.enum';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwt: JwtService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<Permission[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredPermissions) {
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
    const canActivate = requiredPermissions.some((permission) =>
      user.role?.permissions.includes(permission),
    );
    if (!canActivate) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
