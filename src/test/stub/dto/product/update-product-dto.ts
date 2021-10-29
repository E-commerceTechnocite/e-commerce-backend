import { UpdateProductDto } from '@app/product/dto/product/update-product.dto';

export const updateProductDto = () => {
  const stub = new UpdateProductDto();
  stub.categoryId = '3f736e98-e50f-4920-aeff-c6b808350ea6';
  stub.title = 'hello title';
  stub.price = 39.99;
  stub.stock = {
    incoming: 10,
    pending: 10,
    physical: 10,
  };
  stub.description = 'hello description';
  stub.reference = '123456789';
  stub.thumbnailId = undefined;
  stub.picturesId = [];
  stub.taxRuleGroupId = undefined;
  return stub;
};
