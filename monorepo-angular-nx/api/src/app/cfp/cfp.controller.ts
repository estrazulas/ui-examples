import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { SpeakerDto } from '@org/shared-types';
import { CfpService } from './cfp.service';
import { CreateSpeakerDto } from './dto/create-speaker.dto';

@Controller('cfp')
export class CfpController {
  constructor(private readonly cfpService: CfpService) {}

  @Post('submit')
  @HttpCode(201)
  submit(@Body() dto: CreateSpeakerDto): SpeakerDto {
    return this.cfpService.submit(dto);
  }
}
