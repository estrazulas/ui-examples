import { Test, TestingModule } from '@nestjs/testing';
import { CfpController } from './cfp.controller';
import { CfpService } from './cfp.service';
import { CreateSpeakerDto } from './dto/create-speaker.dto';

describe('CfpController', () => {
  let controller: CfpController;
  let service: CfpService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CfpController],
      providers: [CfpService],
    }).compile();

    controller = module.get<CfpController>(CfpController);
    service = module.get<CfpService>(CfpService);
  });

  const validDto: CreateSpeakerDto = {
    nome: 'Fulano',
    email: 'fulano@example.com',
    talkTitle: 'Angular Signals',
    isGDE: false,
  };

  it('should return 201 with SpeakerDto containing id on valid payload', () => {
    const result = controller.submit(validDto);
    expect(result.id).toBeDefined();
    expect(result.nome).toBe(validDto.nome);
    expect(result.email).toBe(validDto.email);
    expect(result.talkTitle).toBe(validDto.talkTitle);
    expect(result.isGDE).toBe(validDto.isGDE);
  });

  it('should store the submission via the service', () => {
    const spy = jest.spyOn(service, 'submit');
    controller.submit(validDto);
    expect(spy).toHaveBeenCalledWith(validDto);
  });
});
