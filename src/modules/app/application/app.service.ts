import { Injectable } from '@nestjs/common';

/**
 * Main application service.
 * This service contains the business logic of the main application.
 * Currently, it provides a simple method to return a greeting message.
 */
@Injectable()
export class AppService {
  /**
   * Returns a greeting message.
   * This method can be used to verify basic functionality and connectivity of the application.
   *
   * @returns {string} A static greeting message, 'Hello World!'.
   */
  getHello(): string {
    return 'Hello World!';
  }
}
