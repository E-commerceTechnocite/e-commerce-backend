import { ProductCategoryDto } from '@app/product/dto/product-category/product-category.dto';
import { validate } from 'class-validator';
import { createProductCategoryDto } from '@app/test/stub';

describe('Product Category Dto Validation', () => {
  const assertStubHasOneError = async (stub: ProductCategoryDto) => {
    const actual = await validate(stub);
    expect(actual).toHaveLength(1);
    expect(actual[0].constraints).toBeDefined();
  };

  const assertStubIsValid = async (stub: ProductCategoryDto) => {
    const actual = await validate(stub);
    expect(actual).toHaveLength(0);
    expect(actual[0]).toBeUndefined();
  };

  it('should validate', async () => {
    await assertStubIsValid(createProductCategoryDto());
  });

  describe('label', () => {
    it('should be more than 2 chars', async () => {
      const stub = createProductCategoryDto();
      stub.label = 'e';
      await assertStubHasOneError(stub);
    });
    it('should not be blank', async () => {
      const stub = createProductCategoryDto();
      stub.label = '';
      await assertStubHasOneError(stub);
    });
  });
});
