import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from '../api/input-dtos/create-event.dto';
import { Event } from '../domain/schema/event.schema';
import { EventsRepository } from '../infrastructure/events.repository';
import { isValidObjectId } from 'mongoose';

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

  async updateEvent(eventId: string, updateData: any): Promise<Event> {
    await this.validateEventId(eventId);
    await this.validateEventExists(eventId);
    return this.eventsRepository.updateEvent(eventId, updateData);
  }

  async deleteEvent(eventId: string): Promise<any> {
    await this.validateEventId(eventId);
    await this.validateEventExists(eventId);
    return this.eventsRepository.deleteEvent(eventId);
  }
}
