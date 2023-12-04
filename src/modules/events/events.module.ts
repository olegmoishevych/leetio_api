import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { EventsService } from './application/events.service';
import { EventsController } from './api/events.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema } from './domain/schema/event.schema';
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
})
export class EventsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes(EventsController);
  }
}
