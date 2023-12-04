import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Event } from '../domain/schema/event.schema';
import { CreateEventDto } from '../api/input-dtos/create-event.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateEventDto } from '../api/input-dtos/update-event.dto';

@Injectable()
export class EventsRepository {
  constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}

  async findById(eventId: string): Promise<Event | null> {
    return this.eventModel.findById(eventId).exec();
  }
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

  async registerToEvent(eventId: string, userId: string): Promise<Event> {
    return this.eventModel
      .findByIdAndUpdate(
        eventId,
        { $addToSet: { userIds: userId } },
        { new: true },
      )
      .exec();
  }

  async unregisterFromEvent(eventId: string, userId: string): Promise<Event> {
    return this.eventModel
      .findByIdAndUpdate(eventId, { $pull: { userIds: userId } }, { new: true })
      .exec();
  }

  async updateEvent(eventId: string, dto: UpdateEventDto): Promise<Event> {
    return this.eventModel
      .findByIdAndUpdate(eventId, dto, { new: true })
      .exec();
  }

  async deleteEvent(eventId: string): Promise<any> {
    return this.eventModel.findByIdAndDelete(eventId).exec();
  }
}
