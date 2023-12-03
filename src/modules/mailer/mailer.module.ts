import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailerService } from './application/mailer.service';
import { MailerRepository } from './infrastructure/mailer.repository';

/**
 * MailerGlobalModule: A global module that configures and provides the MailerService.
 * This module uses the MailerModule from @nestjs-modules/mailer for sending emails.
 * It is configured to use environment variables for email credentials and settings.
 */
@Module({
  imports: [
    ConfigModule.forRoot(),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          service: 'gmail',
          auth: {
            user: configService.get<string>('EMAIL_USER'),
            pass: configService.get<string>('EMAIL_PASSWORD'),
          },
        },
      }),
    }),
  ],
  providers: [MailerService, MailerRepository],
  exports: [MailerService, MailerRepository],
})
export class MailerGlobalModule {}
