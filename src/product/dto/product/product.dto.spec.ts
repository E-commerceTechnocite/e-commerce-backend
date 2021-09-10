import { validate } from 'class-validator';
import { ProductDto } from '@app/product/dto/product/product.dto';

describe('Product Dto Validation', () => {
  const getStub = (): ProductDto => {
    const stub = new ProductDto();
    stub.categoryId = '3f736e98-e50f-4920-aeff-c6b808350ea6';
    stub.title = 'hello title';
    stub.price = 39.99;
    stub.description = 'hello description';
    stub.reference = '123456789';
    return stub;
  };

  const assertStubHasOneError = async (stub: ProductDto) => {
    const actual = await validate(stub);
    expect(actual).toHaveLength(1);
    expect(actual[0].constraints).toBeDefined();
  };

  const assertStubIsValid = async (stub: ProductDto) => {
    const actual = await validate(stub);
    expect(actual).toHaveLength(0);
    expect(actual[0]).toBeUndefined();
  };

  it('should validate', async () => {
    await assertStubIsValid(getStub());
  });

  describe('title', () => {
    it('should be more than 2 chars', async () => {
      const stub = getStub();
      stub.title = 'e';
      await assertStubHasOneError(stub);
    });
    it('should not be blank', async () => {
      const stub = getStub();
      stub.title = '';
      await assertStubHasOneError(stub);
    });
  });

  describe('price', () => {
    it('should be a positive number', async () => {
      const stub = getStub();
      stub.price = -5;
      await assertStubHasOneError(stub);
    });
    it('should have maximum two decimal', async () => {
      const stub = getStub();
      stub.price = 10.222222;
      await assertStubHasOneError(stub);
    });
  });

  describe('description', () => {
    it('should be at least 10 characters', async () => {
      const stub = getStub();
      stub.description = 'short';
      await assertStubHasOneError(stub);
    });
    it('should not be blank', async () => {
      const stub = getStub();
      stub.description = '';
      await assertStubHasOneError(stub);
    });
  });

  describe('reference', () => {
    it('should be more than 2 chars', async () => {
      const stub = getStub();
      stub.reference = '1';
      await assertStubHasOneError(stub);
    });
    it('should not be blank', async () => {
      const stub = getStub();
      stub.reference = '';
      await assertStubHasOneError(stub);
    });
  });

  describe('category id', () => {
    it('should be a UUID', async () => {
      const stub = getStub();
      stub.categoryId = 'not-a-uuid';
      await assertStubHasOneError(stub);
    });
    it('should not be blank', async () => {
      const stub = getStub();
      stub.categoryId = '';
      await assertStubHasOneError(stub);
    });
  });
});
