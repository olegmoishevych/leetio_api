import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

/**
 * MailerRepository: A service class for handling email operations.
 * This class acts as a layer between the application and the MailerService,
 * providing a more abstracted interface for sending emails.
 */
@Injectable()
export class MailerRepository {
  constructor(private readonly mailerService: MailerService) {}
  /**
   * Sends an email.
   * Uses the MailerService to send an email with the provided details.
   *
   * @param {string} email - The recipient's email address.
   * @param {string} subject - The subject line of the email.
   * @param {string} html - The HTML content of the email body.
   * @returns {Promise<boolean>} - A promise that resolves to a boolean indicating the success or failure of the email sending operation.
   */
  async sentEmail(
    email: string,
    subject: string,
    html: string,
  ): Promise<boolean> {
    return this.mailerService.sendMail({
      from: 'Welcome! <olegmoishevych@gmail.com>',
      to: email,
      subject,
      html,
    });
  }
}
