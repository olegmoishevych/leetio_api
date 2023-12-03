import { Injectable } from '@nestjs/common';
import { MailerRepository } from '../infrastructure/mailer.repository';

/**
 * MailerService: A service responsible for handling high-level email operations.
 * This service provides an abstraction over the MailerRepository, allowing for more
 * complex operations and transformations before sending emails.
 */
@Injectable()
export class MailerService {
  constructor(private mailerRepository: MailerRepository) {}
  /**
   * Sends an email for registration confirmation.
   * This method prepares the content for the confirmation email and utilizes the MailerRepository
   * to actually send the email.
   *
   * @param {string} email - Recipient's email address.
   * @param {string} confirmationLink - The link to be clicked for confirming registration.
   * @returns {Promise<boolean>} - A promise that resolves to a boolean indicating the success or failure of sending the email.
   */
  async sendConfirmationCodeByEmail(
    email: string,
    confirmationLink: string,
  ): Promise<boolean> {
    const html = `<p>To confirm your registration, please click on the following <a href="${confirmationLink}">link</a>.</p>`;

    return this.mailerRepository.sentEmail(email, 'Email Confirmation', html);
  }
}
