import { Controller, Get } from '@nestjs/common';
import type { SpeakerDto } from '@org/shared-types';
import { SpeakersService } from './speakers.service';

@Controller('cfp')
export class SpeakersController {
  constructor(private readonly speakersService: SpeakersService) {}

  @Get()
  findAll(): SpeakerDto[] {
    return this.speakersService.findAll();
  }
}
