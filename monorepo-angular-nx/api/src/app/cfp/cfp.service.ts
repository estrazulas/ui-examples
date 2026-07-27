import { Injectable } from '@nestjs/common';
import type { SpeakerDto } from '@org/shared-types';
import { CreateSpeakerDto } from './dto/create-speaker.dto';
import { SpeakersService } from '../speakers/speakers.service';

@Injectable()
export class CfpService {
  constructor(private readonly speakersService: SpeakersService) {}

  submit(dto: CreateSpeakerDto): SpeakerDto {
    const id = crypto.randomUUID();
    const speaker: SpeakerDto = { id, ...dto };
    this.speakersService.add(speaker);
    return speaker;
  }
}
