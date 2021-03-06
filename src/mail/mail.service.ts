import { User } from '@app/user/entities/user.entity';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: User, password: string) {
    const url = `example.com/auth/confirm?token=`;

    await this.mailerService.sendMail({
      to: user.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './confirmation', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        name: user.username,
        password,
        url,
      },
    });
  }

  async sendAdminCreation(admin: User, rawPassword: string) {
    await this.mailerService.sendMail({
      to: admin.email,
      subject: 'Superadmin account validation',
      template: './superadmin-creation',
      context: {
        username: admin.username,
        password: rawPassword,
      },
    });
  }
}
