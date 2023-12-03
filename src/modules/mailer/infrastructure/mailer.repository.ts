import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailerRepository {
  constructor(private readonly mailerService: MailerService) {}
  async sentEmail(
    email: string,
    subject: string,
    html: string,
  ): Promise<boolean> {
    return this.mailerService.sendMail({
      from: 'oleg <olegmoishevych@gmail.com>',
      to: email,
      subject,
      html,
    });
  }
}
