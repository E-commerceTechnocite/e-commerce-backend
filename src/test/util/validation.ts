import { validate } from 'class-validator';

// eslint-disable-next-line @typescript-eslint/ban-types
export const assertStubHasOneError = async <T extends object>(stub: T) => {
  const actual = await validate(stub);
  expect(actual).toHaveLength(1);
  expect(actual[0].constraints).toBeDefined();
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const assertStubIsValid = async <T extends object>(stub: T) => {
  const actual = await validate(stub);
  expect(actual).toHaveLength(0);
  expect(actual[0]).toBeUndefined();
};
