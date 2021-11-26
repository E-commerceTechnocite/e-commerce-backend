import { IsPositiveIntPipe } from './is-positive-int.pipe';
import { mock } from 'jest-mock-extended';
import { ArgumentMetadata } from '@nestjs/common';

describe('IsPositiveIntPipe', () => {
  const pipe = new IsPositiveIntPipe();
  const metadata = mock<ArgumentMetadata>({
    data: 'property',
  });

  it('should be defined', () => {
    expect(pipe).toBeDefined();
  });

  it('should not be 0', () => {
    expect(() => {
      pipe.transform(0, metadata);
    }).toThrow();
  });

  it('should not be negative', () => {
    expect(() => {
      pipe.transform(-10, metadata);
    }).toThrow();
  });

  it('should be an integer', () => {
    expect(() => {
      pipe.transform(3.14, metadata);
    }).toThrow();
  });

  it('should be greater or equal than 1', () => {
    expect(pipe.transform(1, metadata)).toBeTruthy();
    expect(pipe.transform(10, metadata)).toBeTruthy();
    expect(pipe.transform(1000, metadata)).toBeTruthy();
  });
});
