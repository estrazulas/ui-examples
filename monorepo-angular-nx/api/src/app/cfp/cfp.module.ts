import { Module } from '@nestjs/common';
import { CfpController } from './cfp.controller';
import { CfpService } from './cfp.service';
import { SpeakersModule } from '../speakers/speakers.module';

@Module({
  imports: [SpeakersModule],
  controllers: [CfpController],
  providers: [CfpService],
})
export class CfpModule {}
