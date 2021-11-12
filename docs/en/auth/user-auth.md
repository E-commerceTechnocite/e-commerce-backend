# Admin auth

---

## Authorization

### Decorators

Decorators can be applied to controllers of controller actions

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
### Roles

### Permissions

---