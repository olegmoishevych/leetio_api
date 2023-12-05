import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from './jwt.service';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

describe('JwtService', () => {
  let service: JwtService;
  let jwtServiceMock: NestJwtService;
  let configServiceMock: ConfigService;

  beforeEach(async () => {
    const mockJwtService = {
      sign: jest.fn().mockReturnValue('mock_token'),
      decode: jest.fn().mockReturnValue({ userId: '123' }),
      verify: jest.fn().mockReturnValue(true),
    };

    const mockConfigService = {
      get: jest.fn((key: string) => {
        if (key === 'JWT_SECRET') return 'secret';
        if (key === 'JWT_ACCESS_TOKEN_EXPIRATION_TIME') return '1h';
        if (key === 'JWT_REFRESH_TOKEN_EXPIRATION_TIME') return '7d';
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtService,
        {
          provide: NestJwtService,
          useValue: mockJwtService,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<JwtService>(JwtService);
    jwtServiceMock = module.get<NestJwtService>(NestJwtService);
    configServiceMock = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate access token', () => {
    const token = service.generateAccessToken('123');
    expect(token).toEqual('mock_token');
    expect(jwtServiceMock.sign).toHaveBeenCalledWith(
      { userId: '123' },
      { secret: 'secret', expiresIn: '1h' },
    );
  });

  it('should generate refresh token', () => {
    const token = service.generateRefreshToken('123');
    expect(token).toEqual('mock_token');
    expect(jwtServiceMock.sign).toHaveBeenCalledWith(
      { userId: '123' },
      { secret: 'secret', expiresIn: '7d' },
    );
  });

  it('should decode token', () => {
    const decoded = service.decodeToken('some_token');
    expect(decoded).toEqual({ userId: '123' });
    expect(jwtServiceMock.decode).toHaveBeenCalledWith('some_token');
  });

  it('should verify token', () => {
    const isValid = service.verifyToken('valid_token');
    expect(isValid).toBeTruthy();
    expect(jwtServiceMock.verify).toHaveBeenCalledWith('valid_token', {
      secret: 'secret',
    });
  });
});
