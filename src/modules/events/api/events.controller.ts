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
import { UpdateEventDto } from './input-dtos/update-event.dto';
import { ApiCreateEventSwagger } from '../swagger/create-event';
import { ApiGetAllEventsSwagger } from '../swagger/get-all-events';
import { ApiRegisterToEventSwagger } from '../swagger/registration-event';
import { ApiUnregisterFromEventSwagger } from '../swagger/unregistration-event';
import { ApiUpdateEventSwagger } from '../swagger/update-event';

@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}
  @ApiCreateEventSwagger()
  @Post()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtMiddleware)
  async createEvent(@Body() dto: CreateEventDto, @Req() req) {
    return this.eventsService.createEvent(dto, req.user.userId);
  }

  @ApiGetAllEventsSwagger()
  @Get()
  async getAllEvents() {
    return this.eventsService.getAllEvents();
  }
  @ApiRegisterToEventSwagger()
  @Post(':eventId/registration')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtMiddleware)
  async registerToEvent(@Param('eventId') eventId: string, @Req() req) {
    return this.eventsService.registerToEvent(eventId, req.user.userId);
  }

  @ApiUnregisterFromEventSwagger()
  @Post(':eventId/unregister')
  @UseGuards(JwtMiddleware)
  async unregisterFromEvent(@Param('eventId') eventId: string, @Req() req) {
    return this.eventsService.unregisterFromEvent(eventId, req.user.userId);
  }

  @ApiUpdateEventSwagger()
  @Put(':eventId')
  @UseGuards(JwtMiddleware)
  @HttpCode(HttpStatus.OK)
  async updateEvent(
    @Param('eventId') eventId: string,
    @Body() dto: UpdateEventDto,
    @Req() req,
  ) {
    return this.eventsService.updateEvent(eventId, req.user.userId, dto);
  }

  @Delete(':eventId')
  @UseGuards(JwtMiddleware)
  @HttpCode(HttpStatus.OK)
  async deleteEvent(@Param('eventId') eventId: string, @Req() req) {
    return this.eventsService.deleteEvent(eventId, req.user.userId);
  }
}
