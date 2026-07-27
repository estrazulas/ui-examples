import {
  Body,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import type { EventDto } from '@org/shared-types';
import { CreateEventDto } from './dto/create-event.dto';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @HttpCode(201)
  create(@Body() dto: CreateEventDto): EventDto {
    return this.eventsService.create(dto);
  }

  @Get()
  findAll(): EventDto[] {
    return this.eventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): EventDto {
    const event = this.eventsService.findOne(id);
    if (!event) {
      throw new NotFoundException();
    }
    return event;
  }
}
