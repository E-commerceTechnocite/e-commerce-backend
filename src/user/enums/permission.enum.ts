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

  READ_TAX_RULE = 'r:tax_rule',
  CREATE_TAX_RULE = 'c:tax_rule',
  UPDATE_TAX_RULE = 'u:tax_rule',
  DELETE_TAX_RULE = 'd:tax_rule',

  READ_TAX_RULE_GROUP = 'r:tax_rule_group',
  CREATE_TAX_RULE_GROUP = 'c:tax_rule_group',
  UPDATE_TAX_RULE_GROUP = 'u:tax_rule_group',
  DELETE_TAX_RULE_GROUP = 'd:tax_rule_group',
}

export class PermissionUtil {
  static allPermissions(): Permission[] {
    return [
      Permission.READ_PRODUCT,
      Permission.CREATE_PRODUCT,
      Permission.UPDATE_PRODUCT,
      Permission.DELETE_PRODUCT,

      Permission.READ_CATEGORY,
      Permission.CREATE_CATEGORY,
      Permission.UPDATE_CATEGORY,
      Permission.DELETE_CATEGORY,

      Permission.READ_TAX,
      Permission.CREATE_TAX,
      Permission.UPDATE_TAX,
      Permission.DELETE_TAX,

      Permission.READ_TAX_RULE,
      Permission.CREATE_TAX_RULE,
      Permission.UPDATE_TAX_RULE,
      Permission.DELETE_TAX_RULE,

      Permission.READ_TAX_RULE_GROUP,
      Permission.CREATE_TAX_RULE_GROUP,
      Permission.UPDATE_TAX_RULE_GROUP,
      Permission.DELETE_TAX_RULE_GROUP,

      Permission.READ_COUNTRY,
      Permission.CREATE_COUNTRY,
      Permission.UPDATE_COUNTRY,
      Permission.DELETE_COUNTRY,
    ];
  }

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
}
