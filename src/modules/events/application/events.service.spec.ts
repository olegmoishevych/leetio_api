import { Test, TestingModule } from '@nestjs/testing';
import { EventsService } from './events.service';
import { EventsRepository } from '../infrastructure/events.repository';
import { CreateEventDto } from '../api/input-dtos/create-event.dto';

describe('EventsService', () => {
  let service: EventsService;
  let mockEventsRepository: Partial<EventsRepository>;

  beforeEach(async () => {
    mockEventsRepository = {
      createEvent: jest
        .fn()
        .mockImplementation((dto, userId) =>
          Promise.resolve({ ...dto, id: 'someEventId', creatorUserId: userId }),
        ),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        { provide: EventsRepository, useValue: mockEventsRepository },
      ],
    }).compile();

    service = module.get<EventsService>(EventsService);
  });

  it('should create an event and return it', async () => {
    const userId = 'someUserId';
    const createEventDto = new CreateEventDto();
    createEventDto.name = 'Annual Conference';
    createEventDto.location = 'Central Park';
    createEventDto.startDate = new Date('2023-07-21T19:00:00.000Z');
    createEventDto.endDate = new Date('2023-07-22T23:00:00.000Z');
    createEventDto.description = 'This is a description of the event.';

    const event = await service.createEvent(createEventDto, userId);

    expect(event).toBeDefined();
    expect(event.id).toBe('someEventId');
    expect(event.creatorUserId).toBe(userId);
    expect(mockEventsRepository.createEvent).toHaveBeenCalledWith(
      createEventDto,
      userId,
    );
  });

  it('should return an array of all events', async () => {
    const mockEvents = [
      {
        _id: 'someEventId1',
        name: 'Event 1',
        location: 'Location 1',
        startDate: new Date('2023-01-01T00:00:00.000Z'),
        endDate: new Date('2023-01-02T00:00:00.000Z'),
        creatorUserId: 'creatorUserId1',
        userIds: ['userId1', 'userId2'],
        status: 'Active',
      },
      {
        _id: 'someEventId2',
        name: 'Event 2',
        location: 'Location 2',
        startDate: new Date('2023-02-01T00:00:00.000Z'),
        endDate: new Date('2023-02-02T00:00:00.000Z'),
        creatorUserId: 'creatorUserId2',
        userIds: ['userId3', 'userId4'],
        status: 'Active',
      },
    ];

    mockEventsRepository.getAllEvents = jest.fn().mockResolvedValue(mockEvents);

    const events = await service.getAllEvents();
    expect(events).toEqual(mockEvents);
    expect(events).toHaveLength(mockEvents.length);
    expect(mockEventsRepository.getAllEvents).toHaveBeenCalled();
  });
});
