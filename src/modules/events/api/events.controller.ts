import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
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
  @Post(':eventId/registration')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtMiddleware)
  async registerToEvent(@Param('eventId') eventId: string, @Req() req) {
    return this.eventsService.registerToEvent(eventId, req.user.userId);
  }

  @Post(':eventId/unregister')
  @UseGuards(JwtMiddleware)
  async unregisterFromEvent(@Param('eventId') eventId: string, @Req() req) {
    return this.eventsService.unregisterFromEvent(eventId, req.user.userId);
  }

  @Put(':eventId')
  @UseGuards(JwtMiddleware)
  async updateEvent(
    @Param('eventId') eventId: string,
    @Body() updateData: any,
  ) {
    return this.eventsService.updateEvent(eventId, updateData);
  }

  @Delete(':eventId')
  @UseGuards(JwtMiddleware)
  @HttpCode(HttpStatus.OK)
  async deleteEvent(@Param('eventId') eventId: string, @Req() req) {
    return this.eventsService.deleteEvent(eventId, req.user.userId);
  }
}
