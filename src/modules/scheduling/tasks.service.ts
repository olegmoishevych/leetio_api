import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    @InjectModel(Event.name) private readonly eventModel: Model<Event>,
  ) {}

  @Cron('0 0 * * *')
  async handleCron() {
    this.logger.debug('Cron job for cancelling events started!');

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const eventsToCancel = await this.eventModel.find({
      startDate: { $lte: today },
    });

    for (const event of eventsToCancel) {
      this.logger.debug(`Cancelling event with ID: ${event._id}`);
    }

    if (eventsToCancel.length === 0) {
      this.logger.debug('No events found to cancel.');
    }
  }
}
