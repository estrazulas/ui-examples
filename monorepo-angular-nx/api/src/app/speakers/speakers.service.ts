import { Injectable } from '@nestjs/common';
import type { SpeakerDto } from '@org/shared-types';

@Injectable()
export class SpeakersService {
  private readonly speakers: SpeakerDto[] = [];

  add(speaker: SpeakerDto): void {
    this.speakers.push(speaker);
  }

  findAll(): SpeakerDto[] {
    return this.speakers;
  }
}
