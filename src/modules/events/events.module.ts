import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { EventsService } from './application/events.service';
import { EventsController } from './api/events.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from './domain/schema/event.schema';
import { AuthModule } from '../auth/auth.module';
import { JwtMiddleware } from '../../middlewares/jwt.middleware';
import { EventsRepository } from './infrastructure/events.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
    AuthModule,
  ],
  controllers: [EventsController],
  providers: [EventsService, EventsRepository],
  exports: [MongooseModule],
})
export class EventsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes(
        { path: 'events', method: RequestMethod.POST },
        { path: 'events/:eventId/registration', method: RequestMethod.POST },
        { path: 'events/:eventId/unregister', method: RequestMethod.POST },
        { path: 'events/:eventId', method: RequestMethod.PUT },
        { path: 'events/:eventId', method: RequestMethod.DELETE },
      );
  }
}
