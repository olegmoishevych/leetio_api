import { Test, TestingModule } from '@nestjs/testing';
import { EventsService } from './events.service';
import { EventsRepository } from '../infrastructure/events.repository';
import { CreateEventDto } from '../api/input-dtos/create-event.dto';
import { UpdateEventDto } from '../api/input-dtos/update-event.dto';

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

  it('should register a user to an event and return the updated event', async () => {
    const eventId = 'someEventId';
    const userId = 'someUserId';

    const mockEvent = {
      _id: eventId,
      name: 'Event Name',
      location: 'Event Location',
      startDate: new Date(),
      endDate: new Date(),
      creatorUserId: 'creatorUserId',
      userIds: [userId],
      status: 'Active',
    };

    mockEventsRepository.registerToEvent = jest.fn().mockResolvedValue({
      ...mockEvent,
      userIds: [...mockEvent.userIds, userId],
    });

    service['validateEventId'] = jest.fn().mockResolvedValue(undefined);
    service['validateEventExists'] = jest.fn().mockResolvedValue(undefined);

    const updatedEvent = await service.registerToEvent(eventId, userId);

    expect(service['validateEventId']).toHaveBeenCalledWith(eventId);
    expect(service['validateEventExists']).toHaveBeenCalledWith(eventId);
    expect(mockEventsRepository.registerToEvent).toHaveBeenCalledWith(
      eventId,
      userId,
    );
    expect(updatedEvent.userIds).toContain(userId);
  });

  it('should unregister a user from an event and return the updated event', async () => {
    const eventId = 'someEventId';
    const userId = 'someUserId';

    const mockEvent = {
      _id: eventId,
      name: 'Event Name',
      location: 'Event Location',
      startDate: new Date(),
      endDate: new Date(),
      creatorUserId: 'creatorUserId',
      userIds: [userId, 'otherUserId'],
      status: 'Active',
    };

    mockEventsRepository.unregisterFromEvent = jest.fn().mockResolvedValue({
      ...mockEvent,
      userIds: mockEvent.userIds.filter((id) => id !== userId),
    });

    service['validateEventId'] = jest.fn().mockResolvedValue(undefined);
    service['validateEventExists'] = jest.fn().mockResolvedValue(undefined);

    const updatedEvent = await service.unregisterFromEvent(eventId, userId);

    expect(service['validateEventId']).toHaveBeenCalledWith(eventId);
    expect(service['validateEventExists']).toHaveBeenCalledWith(eventId);
    expect(mockEventsRepository.unregisterFromEvent).toHaveBeenCalledWith(
      eventId,
      userId,
    );
    expect(updatedEvent.userIds).not.toContain(userId);
  });

  it('should update an event and return the updated event', async () => {
    const eventId = 'someEventId';
    const userId = 'creatorUserId';
    const updateEventDto: UpdateEventDto = {
      name: 'Updated Conference',
      location: 'New Park',
      startDate: new Date('2023-08-21T19:00:00.000Z'),
      endDate: new Date('2023-08-22T23:00:00.000Z'),
      description: 'Updated description of the event.',
    };

    const existingEvent = {
      _id: eventId,
      name: 'Event Name',
      location: 'Event Location',
      startDate: new Date(),
      endDate: new Date(),
      creatorUserId: userId,
      userIds: [userId],
      status: 'Active',
    };

    mockEventsRepository.findById = jest.fn().mockResolvedValue(existingEvent);
    mockEventsRepository.updateEvent = jest
      .fn()
      .mockResolvedValue({ ...existingEvent, ...updateEventDto });

    service['validateEventId'] = jest.fn().mockResolvedValue(undefined);

    const updatedEvent = await service.updateEvent(
      eventId,
      userId,
      updateEventDto,
    );

    expect(service['validateEventId']).toHaveBeenCalledWith(eventId);
    expect(mockEventsRepository.findById).toHaveBeenCalledWith(eventId);
    expect(mockEventsRepository.updateEvent).toHaveBeenCalledWith(
      eventId,
      updateEventDto,
    );
    expect(updatedEvent).toMatchObject({ ...existingEvent, ...updateEventDto });
  });

  it('should delete an event', async () => {
    const eventId = 'someEventId';
    const userId = 'creatorUserId';

    const existingEvent = {
      _id: eventId,
      name: 'Event Name',
      location: 'Event Location',
      startDate: new Date(),
      endDate: new Date(),
      creatorUserId: userId,
      userIds: [userId],
      status: 'Active',
    };

    mockEventsRepository.findById = jest.fn().mockResolvedValue(existingEvent);
    mockEventsRepository.deleteEvent = jest.fn().mockResolvedValue({});

    service['validateEventId'] = jest.fn().mockResolvedValue(undefined);

    await service.deleteEvent(eventId, userId);

    expect(service['validateEventId']).toHaveBeenCalledWith(eventId);
    expect(mockEventsRepository.findById).toHaveBeenCalledWith(eventId);
    expect(mockEventsRepository.deleteEvent).toHaveBeenCalledWith(eventId);
  });
});
