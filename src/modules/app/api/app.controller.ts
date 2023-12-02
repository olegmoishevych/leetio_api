import { Controller, Get } from '@nestjs/common';
import { AppService } from '../application/app.service';

/**
 * Main application controller.
 * This controller handles the root-level requests for the application.
 * It uses services, like AppService, to process requests and return responses.
 */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  /**
   * Root GET endpoint.
   * Handles GET requests at the root of the application.
   * This endpoint is rate-limited to 5 requests per 30 seconds per IP to prevent abuse.
   * Delegates to AppService to retrieve and return a greeting message.
   *
   * @returns {string} The greeting message returned by the AppService.
   */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
