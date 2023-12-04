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

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const updatedEvents = await this.eventModel.updateMany(
      { endDate: { $lte: today }, status: 'Active' },
      { status: 'Closed' },
    );

    if (updatedEvents.matchedCount === 0) {
      this.logger.debug('No active events found to update status.');
    } else {
      this.logger.debug(
        `Updated ${updatedEvents.matchedCount} events to closed status.`,
      );
    }
  }
}
