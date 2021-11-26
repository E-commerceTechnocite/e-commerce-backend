export enum Permission {
  READ_PRODUCT = 'r:product',
  CREATE_PRODUCT = 'c:product',
  UPDATE_PRODUCT = 'u:product',
  DELETE_PRODUCT = 'd:product',

  READ_CATEGORY = 'r:product-category',
  CREATE_CATEGORY = 'c:product-category',
  UPDATE_CATEGORY = 'u:product-category',
  DELETE_CATEGORY = 'd:product-category',

  READ_COUNTRY = 'r:country',
  CREATE_COUNTRY = 'c:country',
  UPDATE_COUNTRY = 'u:country',
  DELETE_COUNTRY = 'd:country',

  READ_TAX = 'r:tax',
  CREATE_TAX = 'c:tax',
  UPDATE_TAX = 'u:tax',
  DELETE_TAX = 'd:tax',

  READ_TAX_RULE = 'r:tax-rule',
  CREATE_TAX_RULE = 'c:tax-rule',
  UPDATE_TAX_RULE = 'u:tax-rule',
  DELETE_TAX_RULE = 'd:tax-rule',

  READ_TAX_RULE_GROUP = 'r:tax-rule-group',
  CREATE_TAX_RULE_GROUP = 'c:tax-rule-group',
  UPDATE_TAX_RULE_GROUP = 'u:tax-rule-group',
  DELETE_TAX_RULE_GROUP = 'd:tax-rule-group',

  READ_USER = 'r:user',
  CREATE_USER = 'c:user',
  UPDATE_USER = 'u:user',
  DELETE_USER = 'd:user',

  READ_FILE = 'r:file',
  CREATE_FILE = 'c:file',
  UPDATE_FILE = 'u:file',
  DELETE_FILE = 'd:file',

  READ_ROLE = 'r:role',
  CREATE_ROLE = 'c:role',
  UPDATE_ROLE = 'u:role',
  DELETE_ROLE = 'd:role',

  READ_STOCK = 'r:stock',
  CREATE_STOCK = 'c:stock',
  UPDATE_STOCK = 'u:stock',
  DELETE_STOCK = 'd:stock',

  READ_CUSTOMER = 'r:customer',
  CREATE_CUSTOMER = 'c:customer',
  UPDATE_CUSTOMER = 'u:customer',
  DELETE_CUSTOMER = 'd:customer',
}

export class PermissionUtil {
  static allPermissions(): Permission[] {
    const permissions: Permission[] = [];
    for (const [key] of Object.entries(Permission)) {
      permissions.push(Permission[key]);
    }
    return permissions;
  }

  private static allPermissionsByType(
    type: 'r' | 'c' | 'u' | 'd',
  ): Permission[] {
    const permissions: Permission[] = [];
    for (const [key] of Object.entries(Permission)) {
      if (Permission[key].split(':')[0] === type) {
        permissions.push(Permission[key]);
      }
    }
    return permissions;
  }

  static allReadPermissions = () => PermissionUtil.allPermissionsByType('r');
  static allCreatePermissions = () => PermissionUtil.allPermissionsByType('c');
  static allUpdatePermissions = () => PermissionUtil.allPermissionsByType('u');
  static allDeletePermissions = () => PermissionUtil.allPermissionsByType('d');

  static productPermissions(): Permission[] {
    return [
      Permission.READ_PRODUCT,
      Permission.CREATE_PRODUCT,
      Permission.UPDATE_PRODUCT,
      Permission.DELETE_PRODUCT,
    ];
  }

  static categoryPermissions(): Permission[] {
    return [
      Permission.READ_CATEGORY,
      Permission.CREATE_CATEGORY,
      Permission.UPDATE_CATEGORY,
      Permission.DELETE_CATEGORY,
    ];
  }

  static taxPermissions(): Permission[] {
    return [
      Permission.READ_TAX,
      Permission.CREATE_TAX,
      Permission.UPDATE_TAX,
      Permission.DELETE_TAX,
    ];
  }

  static taxRulePermissions(): Permission[] {
    return [
      Permission.READ_TAX_RULE,
      Permission.CREATE_TAX_RULE,
      Permission.UPDATE_TAX_RULE,
      Permission.DELETE_TAX_RULE,
    ];
  }

  static taxRuleGroupPermissions(): Permission[] {
    return [
      Permission.READ_TAX_RULE_GROUP,
      Permission.CREATE_TAX_RULE_GROUP,
      Permission.UPDATE_TAX_RULE_GROUP,
      Permission.DELETE_TAX_RULE_GROUP,
    ];
  }

  static countryPermissions(): Permission[] {
    return [
      Permission.READ_COUNTRY,
      Permission.CREATE_COUNTRY,
      Permission.UPDATE_COUNTRY,
      Permission.DELETE_COUNTRY,
    ];
  }

  static userPermissions(): Permission[] {
    return [
      Permission.READ_USER,
      Permission.CREATE_USER,
      Permission.UPDATE_USER,
      Permission.DELETE_USER,
    ];
  }

  static rolePermissions(): Permission[] {
    return [
      Permission.READ_ROLE,
      Permission.CREATE_ROLE,
      Permission.UPDATE_ROLE,
      Permission.DELETE_ROLE,
    ];
  }

  static stockPermissions(): Permission[] {
    return [
      Permission.READ_STOCK,
      Permission.CREATE_STOCK,
      Permission.UPDATE_STOCK,
      Permission.DELETE_STOCK,
    ];
  }

  static customerPermissions(): Permission[] {
    return [
      Permission.READ_CUSTOMER,
      Permission.CREATE_CUSTOMER,
      Permission.UPDATE_CUSTOMER,
      Permission.DELETE_CUSTOMER,
    ];
  }
}
