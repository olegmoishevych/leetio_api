import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Event } from '../domain/schema/event.schema';
import { CreateEventDto } from '../api/input-dtos/create-event.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class EventsRepository {
  constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}

  async createEvent(dto: CreateEventDto, userId: string): Promise<Event> {
    const newEvent = new this.eventModel({
      ...dto,
      creatorUserId: userId,
      userIds: [userId],
    });
    return newEvent.save();
  }

  async getAllEvents(): Promise<Event[]> {
    return this.eventModel.find().exec();
  }
}
