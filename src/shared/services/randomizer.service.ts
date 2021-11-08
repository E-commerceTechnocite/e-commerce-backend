import { Injectable } from '@nestjs/common';

@Injectable()
export class RandomizerService {
  generatePassword(passwordLength: number): string {
    const randomString =
      'azertyuiopqsdfghjklmwxcvbnAZERTYUIOPQSDFGHJKLMWXCVBN8527419630';
    let password = '';
    for (let i = 0; i < passwordLength; i++) {
      password += randomString[Math.floor(Math.random() * randomString.length)];
    }
    return password;
  }
}
