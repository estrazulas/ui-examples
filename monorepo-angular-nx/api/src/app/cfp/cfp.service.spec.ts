import { Test } from '@nestjs/testing';
import { CfpService } from './cfp.service';
import { CreateSpeakerDto } from './dto/create-speaker.dto';

describe('CfpService', () => {
  let service: CfpService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [CfpService],
    }).compile();

    service = module.get<CfpService>(CfpService);
  });

  const validDto: CreateSpeakerDto = {
    nome: 'Fulano',
    email: 'fulano@example.com',
    talkTitle: 'Angular Signals',
    isGDE: false,
  };

  it('should generate an id for the speaker', () => {
    const result = service.submit(validDto);
    expect(result.id).toBeDefined();
    expect(typeof result.id).toBe('string');
  });

  it('should return the complete SpeakerDto with all fields', () => {
    const result = service.submit(validDto);
    expect(result.nome).toBe(validDto.nome);
    expect(result.email).toBe(validDto.email);
    expect(result.talkTitle).toBe(validDto.talkTitle);
    expect(result.isGDE).toBe(validDto.isGDE);
  });

  it('should store the speaker in the internal map', () => {
    const result = service.submit(validDto);
    const stored = (service as unknown as { speakers: Map<string, unknown> }).speakers.get(result.id);
    expect(stored).toBeDefined();
    expect(stored).toEqual(result);
  });
});
