import { Injectable } from '@nestjs/common';
import type { EventDto } from '@org/shared-types';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventsService {
  private readonly events: EventDto[] = [];

  create(dto: CreateEventDto): EventDto {
    const event: EventDto = { id: crypto.randomUUID(), ...dto };
    this.events.push(event);
    return event;
  }

  findAll(): EventDto[] {
    return this.events;
  }

  findOne(id: string): EventDto | undefined {
    return this.events.find((e) => e.id === id);
  }
}
