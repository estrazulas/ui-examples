import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateSpeakerDto } from './create-speaker.dto';

describe('CreateSpeakerDto', () => {
  const validPayload = {
    nome: 'Fulano',
    email: 'fulano@example.com',
    talkTitle: 'Angular Signals',
    isGDE: false,
  };

  it('should pass validation with a valid payload', async () => {
    const dto = plainToInstance(CreateSpeakerDto, validPayload);
    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });

  it('should reject payload without nome', async () => {
    const invalid = { email: validPayload.email, talkTitle: validPayload.talkTitle, isGDE: validPayload.isGDE };
    const dto = plainToInstance(CreateSpeakerDto, invalid);
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('nome');
  });

  it('should reject payload without email', async () => {
    const invalid = { nome: validPayload.nome, talkTitle: validPayload.talkTitle, isGDE: validPayload.isGDE };
    const dto = plainToInstance(CreateSpeakerDto, invalid);
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('email');
  });

  it('should reject payload with invalid email', async () => {
    const dto = plainToInstance(CreateSpeakerDto, {
      ...validPayload,
      email: 'invalido',
    });
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('email');
  });

  it('should reject payload without talkTitle', async () => {
    const invalid = { nome: validPayload.nome, email: validPayload.email, isGDE: validPayload.isGDE };
    const dto = plainToInstance(CreateSpeakerDto, invalid);
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('talkTitle');
  });

  it('should reject payload with isGDE as string', async () => {
    const dto = plainToInstance(CreateSpeakerDto, {
      ...validPayload,
      isGDE: 'sim',
    });
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('isGDE');
  });
});
