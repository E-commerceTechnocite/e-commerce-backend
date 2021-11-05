declare namespace jest {
  import { CanActivate } from '@nestjs/common';
  import { Permission } from '@app/user/enums/permission.enum';
  import { IAuthGuard } from '@nestjs/passport';

  interface Matchers<R> {
    toHaveGuard: (received: CanActivate | IAuthGuard) => CustomMatcherResult;
    toRequirePermissions: (...received: Permission[]) => CustomMatcherResult;
  }
}
