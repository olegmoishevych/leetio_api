import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { EventsService } from '../application/events.service';
import { CreateEventDto } from './input-dtos/create-event.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtMiddleware } from '../../../middlewares/jwt.middleware';

@ApiTags('Files')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}
  @Post()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtMiddleware)
  async createEvent(@Body() dto: CreateEventDto, @Req() req) {
    return this.eventsService.createEvent(dto, req.user.userId);
  }

  @Get()
  async getAllEvents() {
    return this.eventsService.getAllEvents();
  }
}
