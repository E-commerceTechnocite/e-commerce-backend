import { UpdateProductCategoryDto } from '@app/product/dto/product-category/update-product-category.dto';

export const updateProductCategoryDto = (): UpdateProductCategoryDto => {
  const c = new UpdateProductCategoryDto();
  c.label = 'Electronics';
  return c;
};
