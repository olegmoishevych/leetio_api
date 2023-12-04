import { Injectable } from '@nestjs/common';
import { CreateEventDto } from '../api/input-dtos/create-event.dto';
import { Event } from '../domain/schema/event.schema';
import { EventsRepository } from '../infrastructure/events.repository';

@Injectable()
export class EventsService {
  constructor(private eventsRepository: EventsRepository) {}

  async createEvent(dto: CreateEventDto, userId: string): Promise<Event> {
    return this.eventsRepository.createEvent(dto, userId);
  }

  async getAllEvents(): Promise<Event[]> {
    return this.eventsRepository.getAllEvents();
  }
}
