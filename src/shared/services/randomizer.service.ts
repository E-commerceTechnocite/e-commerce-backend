import { Injectable } from '@nestjs/common';
import { RuntimeException } from '@nestjs/core/errors/exceptions/runtime.exception';

export interface RandomStringOptionsInterface {
  lowerCase?: boolean;
  upperCase?: boolean;
  numbers?: boolean;
  specialCharacters?: boolean;
}

@Injectable()
export class RandomizerService {
  private static readonly LOWER_CASE = 'qwertyuiopasdfghjklzxcvbnm';
  private static readonly UPPER_CASE = 'QWERTYUIOPASDFGHJKLZXCVBNM';
  private static readonly NUMBERS = '0123456789';
  private static readonly SPECIAL_CHARACTERS = '!@$%^&*()_-~[]{}:|<>?,;.';

  private static readonly DEFAULT_RANDOM_STRING_OPTIONS: RandomStringOptionsInterface =
    {
      specialCharacters: true,
      numbers: true,
      upperCase: true,
      lowerCase: true,
    };

  randomString(length: number, opts?: RandomStringOptionsInterface): string {
    const {
      LOWER_CASE,
      UPPER_CASE,
      NUMBERS,
      SPECIAL_CHARACTERS,
      DEFAULT_RANDOM_STRING_OPTIONS,
    } = RandomizerService;

    opts = {
      ...DEFAULT_RANDOM_STRING_OPTIONS,
      ...opts,
    };

    let charString = opts.numbers ? NUMBERS : '';
    charString += opts.specialCharacters ? SPECIAL_CHARACTERS : '';
    charString += opts.lowerCase ? LOWER_CASE : '';
    charString += opts.upperCase ? UPPER_CASE : '';

    if (charString.length === 0)
      throw new RuntimeException(
        'No character set provided to generate a string',
      );

    let generatedString = '';
    for (let i = 0; i < length; i++) {
      generatedString +=
        charString[Math.floor(Math.random() * charString.length)];
    }
    return generatedString;
  }
}
