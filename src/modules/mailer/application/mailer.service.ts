import { Injectable } from '@nestjs/common';
import { MailerRepository } from '../infrastructure/mailer.repository';

/**
 * MailerService: A service responsible for handling high-level email operations.
 * This service abstracts over the MailerRepository, enabling more complex operations
 * and transformations before sending emails.
 */
@Injectable()
export class MailerService {
  constructor(private mailerRepository: MailerRepository) {}

  /**
   * Sends a registration notification email.
   * This method prepares the content for the email and uses the MailerRepository
   * to send it. The content of the email includes a message confirming successful registration.
   *
   * @param {string} email - The recipient's email address.
   * @returns {Promise<boolean>} - A promise resolving to a boolean indicating the success or failure of sending the email.
   */
  async sendRegistrationNotification(email: string): Promise<boolean> {
    const html = `<p>You have been successfully registered in our system.</p>`;

    return this.mailerRepository.sentEmail(
      email,
      'Registration Notification',
      html,
    );
  }
}
