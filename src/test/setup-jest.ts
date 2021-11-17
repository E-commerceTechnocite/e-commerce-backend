import { CanActivate } from '@nestjs/common';
import CustomMatcherResult = jest.CustomMatcherResult;
import { Permission } from '@app/user/enums/permission.enum';
import { PERMISSIONS_KEY } from '@app/auth/admin/guard/decorators/granted.decorator';

expect.extend({
  toHaveGuard<T extends new (...args: any[]) => CanActivate>(
    received,
    guard: T,
  ): CustomMatcherResult {
    const guards = (Reflect.getMetadata('__guards__', received) as T[]) ?? [];
    if (guards.includes(guard)) {
      return {
        pass: true,
        message: () => `OK`,
      };
    }
    return {
      pass: false,
      message: () => `${received.name} does not have guard ${guard.name}`,
    };
  },

  toRequirePermissions(
    received,
    ...permissions: Permission[]
  ): CustomMatcherResult {
    const permissionsMetadata =
      (Reflect.getMetadata(PERMISSIONS_KEY, received) as Permission[]) ?? [];

    const missingPermissions: Permission[] = [];
    const hasPermissions = permissions.every((p) => {
      const doesInclude = permissionsMetadata.includes(p);
      if (!doesInclude) missingPermissions.push(p);
      return doesInclude;
    });
    if (hasPermissions) {
      return {
        pass: true,
        message: () => `OK`,
      };
    }
    return {
      pass: false,
      message: () =>
        `"${received.name}" is missing permissions: ${missingPermissions
          .map((p) => `"${p}"`)
          .join(', ')}`,
    };
  },
});
