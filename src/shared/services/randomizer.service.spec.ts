import { Test, TestingModule } from '@nestjs/testing';
import { RandomizerService } from '@app/shared/services/randomizer.service';
import { RuntimeException } from '@nestjs/core/errors/exceptions/runtime.exception';

describe('RandomizerService', () => {
  let service: RandomizerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RandomizerService],
    }).compile();

    service = module.get<RandomizerService>(RandomizerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have specified length', () => {
    const length = 30;

    const randomString = service.randomString(length);

    expect(randomString).toHaveLength(length);
  });

  it('should have options', () => {
    const randomString = service.randomString(20, {
      specialCharacters: false,
      upperCase: false,
      lowerCase: true,
      numbers: false,
    });

    expect(randomString).toEqual(randomString.toLowerCase());
  });

  it('should throw when no type of character is provided', () => {
    const randomString = service.randomString.bind(null, 20, {
      specialCharacters: false,
      upperCase: false,
      lowerCase: false,
      numbers: false,
    });

    expect(randomString).toThrow(RuntimeException);
  });
});
