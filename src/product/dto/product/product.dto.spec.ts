import {
  assertStubHasOneError,
  assertStubIsValid,
} from '@app/test/util/validation';
import { createProductDto } from '@app/test/stub';

describe('Product Dto Validation', () => {
  it('should validate', async () => {
    await assertStubIsValid(createProductDto());
  });

  describe('title', () => {
    it('should be more than 2 chars', async () => {
      const stub = createProductDto();
      stub.title = 'e';
      await assertStubHasOneError(stub);
    });
    it('should not be blank', async () => {
      const stub = createProductDto();
      stub.title = '';
      await assertStubHasOneError(stub);
    });
  });

  describe('price', () => {
    it('should be a positive number', async () => {
      const stub = createProductDto();
      stub.price = -5;
      await assertStubHasOneError(stub);
    });
    it('should have maximum two decimal', async () => {
      const stub = createProductDto();
      stub.price = 10.222222;
      await assertStubHasOneError(stub);
    });
  });

  describe('description', () => {
    it('should be at least 10 characters', async () => {
      const stub = createProductDto();
      stub.description = 'short';
      await assertStubHasOneError(stub);
    });
    it('should not be blank', async () => {
      const stub = createProductDto();
      stub.description = '';
      await assertStubHasOneError(stub);
    });
  });

  describe('reference', () => {
    it('should be more than 2 chars', async () => {
      const stub = createProductDto();
      stub.reference = '1';
      await assertStubHasOneError(stub);
    });
    it('should not be blank', async () => {
      const stub = createProductDto();
      stub.reference = '';
      await assertStubHasOneError(stub);
    });
  });

  describe('category id', () => {
    it('should be a UUID', async () => {
      const stub = createProductDto();
      stub.categoryId = 'not-a-uuid';
      await assertStubHasOneError(stub);
    });
    it('should not be blank', async () => {
      const stub = createProductDto();
      stub.categoryId = '';
      await assertStubHasOneError(stub);
    });
  });
});
