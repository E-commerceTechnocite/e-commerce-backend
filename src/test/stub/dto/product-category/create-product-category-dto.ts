import { ProductCategoryDto } from '@app/product/dto/product-category/product-category.dto';

export const createProductCategoryDto = (): ProductCategoryDto => {
  const stub = new ProductCategoryDto();
  stub.label = 'valid title';
  return stub;
};
