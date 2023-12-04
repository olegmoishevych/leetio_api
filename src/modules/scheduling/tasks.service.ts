import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron } from '@nestjs/schedule';
import { Event } from '../events/domain/schema/event.schema';
import { Model } from 'mongoose';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    @InjectModel(Event.name) private readonly eventModel: Model<Event>,
  ) {}

  @Cron('0 0 * * *')
  async handleCron() {
    this.logger.debug('Cron job for updating event status started!');

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const eventsToUpdate = await this.eventModel.find({
      endDate: { $lt: yesterday },
      status: 'Active',
    });

    for (const event of eventsToUpdate) {
      await this.eventModel.findByIdAndUpdate(event._id, { status: 'Closed' });
      this.logger.debug(`Marked event with ID: ${event._id} as closed.`);
    }

    if (eventsToUpdate.length === 0) {
      this.logger.debug('No events found to update status.');
    }
  }
}
