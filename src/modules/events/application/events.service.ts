import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateEventDto } from '../api/input-dtos/create-event.dto';
import { Event } from '../domain/schema/event.schema';
import { EventsRepository } from '../infrastructure/events.repository';
import { isValidObjectId } from 'mongoose';
import { UpdateEventDto } from '../api/input-dtos/update-event.dto';

@Injectable()
export class EventsService {
  constructor(private eventsRepository: EventsRepository) {}
  private async validateEventExists(eventId: string): Promise<void> {
    const event = await this.eventsRepository.findById(eventId);
    if (!event || !isValidObjectId(eventId)) {
      throw new NotFoundException(`Event with ID ${eventId} not found`);
    }
  }
  private async validateEventId(eventId: string): Promise<void> {
    if (!isValidObjectId(eventId)) {
      throw new NotFoundException(`Event with ID ${eventId} not found`);
    }
  }

  async createEvent(dto: CreateEventDto, userId: string): Promise<Event> {
    return this.eventsRepository.createEvent(dto, userId);
  }

  async getAllEvents(): Promise<Event[]> {
    return this.eventsRepository.getAllEvents();
  }
  async registerToEvent(eventId: string, userId: string): Promise<Event> {
    await this.validateEventId(eventId);
    await this.validateEventExists(eventId);
    return this.eventsRepository.registerToEvent(eventId, userId);
  }

  async unregisterFromEvent(eventId: string, userId: string): Promise<Event> {
    await this.validateEventId(eventId);
    await this.validateEventExists(eventId);
    return this.eventsRepository.unregisterFromEvent(eventId, userId);
  }

  async updateEvent(
    eventId: string,
    userId: string,
    dto: UpdateEventDto,
  ): Promise<Event> {
    await this.validateEventId(eventId);

    const event = await this.eventsRepository.findById(eventId);
    if (!event) {
      throw new NotFoundException(`Event with ID ${eventId} not found`);
    }

    if (event.creatorUserId.toString() !== userId.toString()) {
      throw new UnauthorizedException(
        'You are not authorized to update this event',
      );
    }

    return this.eventsRepository.updateEvent(eventId, dto);
  }

  async deleteEvent(eventId: string, userId: string): Promise<any> {
    await this.validateEventId(eventId);

    const event = await this.eventsRepository.findById(eventId);
    if (!event) {
      throw new NotFoundException(`Event with ID ${eventId} not found`);
    }

    if (event.creatorUserId.toString() !== userId.toString()) {
      throw new UnauthorizedException(
        'You are not authorized to delete this event',
      );
    }

    await this.eventsRepository.deleteEvent(eventId);
  }
}
