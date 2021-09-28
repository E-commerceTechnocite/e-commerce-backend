import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendConfirmationLetter(to: string): Promise<void> {
    try {
      await this.mailerService.sendMail({
        to: 'to',
        from: 'from',
        subject: 'subject',
        text: 'some text',
      });
    } catch (e) {
      console.log(e);
    }
  }
}
