import { User } from '@app/user/entities/user.entity';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private readonly config: ConfigService,
  ) {}

  // createMailerOptions() {
  //   return {
  //     host: this.config.get('MAILER_HOST'),
  //     port: this.config.get('MAILER_PORT'),
  //     user: this.config.get('MAILER_USERNAME'),
  //     pass: this.config.get('MAILER_PASSWORD'),
  //     tls: { rejectUnauthorized: false },
  //     from: this.config.get('MAILER_EMAIL_FROM'),
  //   };
  // }

  async sendUserConfirmation(user: User) {
    const url = `example.com/auth/confirm?token=`;

    await this.mailerService.sendMail({
      to: 'sacha.sh.dev@gmail.com',
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './confirmation', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        name: user.username,
        url,
      },
    });
  }
}
