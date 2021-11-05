import { CanActivate } from '@nestjs/common';
import CustomMatcherResult = jest.CustomMatcherResult;
import { Permission } from '@app/user/enums/permission.enum';
import { PERMISSIONS_KEY } from '@app/auth/admin/guard/granted.decorator';
import { IAuthGuard } from '@nestjs/passport';

expect.extend({
  toHaveGuard(received, guard: CanActivate | IAuthGuard): CustomMatcherResult {
    const guards =
      (Reflect.getMetadata('__guards__', received) as Array<
        CanActivate | IAuthGuard
      >) ?? [];
    if (guards.includes(guard)) {
      return {
        pass: true,
        message: () => `OK`,
      };
    }
    return {
      pass: false,
      message: () =>
        `${received.name} does not have guard ${guard.constructor.name}`,
    };
  },

  toRequirePermissions(
    received,
    ...permissions: Permission[]
  ): CustomMatcherResult {
    const permissionsMetadata =
      (Reflect.getMetadata(PERMISSIONS_KEY, received) as Permission[]) ?? [];
    const hasPermissions = permissions.every((p) =>
      permissionsMetadata.includes(p),
    );
    if (hasPermissions) {
      return {
        pass: true,
        message: () => `OK`,
      };
    }
    return {
      pass: false,
      message: () =>
        `expected value: ${permissions}, received: ${permissionsMetadata}`,
    };
  },
});
