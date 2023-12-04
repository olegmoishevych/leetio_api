import { Module } from '@nestjs/common';
import { EventsService } from './application/events.service';
import { EventsController } from './api/events.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema } from './domain/schema/create.event';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
  ],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
