import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { VerifyResponseDto } from '@app/recaptcha/dto/verify-response.dto';

@Injectable()
export class RecaptchaService {
  private readonly SITE_VERIFY_URL =
    'https://www.google.com/recaptcha/api/siteverify';

  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {}

  verify(
    response: string,
    remoteIp: string = null,
  ): Observable<AxiosResponse<VerifyResponseDto>> {
    const data = new FormData();
    data.append('secret', this.config.get('G_RECAPTCHA_SECRET'));
    data.append('response', response);
    if (remoteIp) {
      data.append('remoteip', remoteIp);
    }
    return this.http.post<VerifyResponseDto>(this.SITE_VERIFY_URL, data);
  }
}
