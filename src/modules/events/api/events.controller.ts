import { Controller } from '@nestjs/common';
import { EventsService } from '../application/events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}
}
