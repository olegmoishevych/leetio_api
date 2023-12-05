import { Test, TestingModule } from '@nestjs/testing';
import { MailerService } from './mailer.service';
import { MailerRepository } from '../infrastructure/mailer.repository';

describe('MailerService', () => {
  let service: MailerService;
  let mailerRepository: MailerRepository;

  beforeEach(async () => {
    const mockMailerRepository = {
      sentEmail: jest.fn().mockResolvedValue(true),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailerService,
        {
          provide: MailerRepository,
          useValue: mockMailerRepository,
        },
      ],
    }).compile();

    service = module.get<MailerService>(MailerService);
    mailerRepository = module.get<MailerRepository>(MailerRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should send registration notification email', async () => {
    const email = 'test@example.com';
    await service.sendRegistrationNotification(email);

    expect(mailerRepository.sentEmail).toHaveBeenCalled();
    expect(mailerRepository.sentEmail).toHaveBeenCalledWith(
      email,
      'Registration Notification',
      expect.any(String),
    );
  });
});
