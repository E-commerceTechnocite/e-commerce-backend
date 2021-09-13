export enum Permission {
  READ_PRODUCT = 'r:product',
  CREATE_PRODUCT = 'c:product',
  UPDATE_PRODUCT = 'u:product',
  DELETE_PRODUCT = 'd:product',

  READ_CATEGORY = 'r:product-category',
  CREATE_CATEGORY = 'c:product-category',
  UPDATE_CATEGORY = 'u:product-category',
  DELETE_CATEGORY = 'd:product-category',
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
}
