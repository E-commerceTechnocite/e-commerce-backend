import { Injectable } from '@nestjs/common';

@Injectable()
export class RandomizerService {
  generatePassword(passwordLength: number): string {
    const randomString: string =
      'azertyuiopqsdfghjklmwxcvbnAZERTYUIOPQSDFGHJKLMWXCVBN8527419630';
    let password: string = '';
    for (let i: number = 0; i < passwordLength; i++) {
      password += randomString[Math.floor(Math.random() * randomString.length)];
    }
    return password;
  }
}
