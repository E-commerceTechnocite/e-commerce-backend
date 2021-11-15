# Admin auth

---

## Authorization

*related modules*
- [`@app/user`](https://github.com/E-commerceTechnocite/e-commerce-backend/tree/main/src/user)
- [`@app/auth/admin`](https://github.com/E-commerceTechnocite/e-commerce-backend/tree/main/src/auth/admin)

### Roles and permissions

Authorization is **claim-based**, which means that every user (`@app/user/entities/user.entity.ts`) has a **set of permissions** (`@app/user/enums/permission.enum.ts`).
Those permissions are not directly set to the user, but to a role (`@app/user/entities/role.entity.ts`). The specified role can then be set to the user.

---
### Decorators

Decorators can be applied to controller classes or specific controller actions

- `AdminAuthenticated` <br>
Checks if the user is authenticated
```ts
import { Controller, Get, Post } from '@nestjs/common';
import { AdminAuthenticated } from '@app/admin/guard/decorators/admin-authenticated.decorator';

// all actions will require authentication
@AdminAuthenticated()
@Controller()
export class ClassScopedController {
}

@Controller()
export class ActionScopedController {
  // this action requires authentication
  @AdminAuthenticated()
  @Post()
  add() {}

  // this action does not require any authenticaiton
  @Get()
  index() {
  }
}
```

    
- `Granted` <br>
Checks if the user is authenticated and has the provided permissions

```ts
import { Controller, Get, Post } from '@nestjs/common';
import { Granted } from '@app/admin/guard/decorators/granted.decorator';
import { Permission } from '@app/user/enums/permission.enum';

// all actions will require the permission to read products
@Granted(Permission.READ_PRODUCT)
@Controller()
export class ClassScopedController {
}

@Controller()
export class ActionScopedController {
  // this action requires the permission to create a product
  @Granted(Permission.CREATE_PRODUCT)
  @Post()
  add() {
  }

  // this action does not require any authentication or permission
  @Get()
  index() {
  }
}
```