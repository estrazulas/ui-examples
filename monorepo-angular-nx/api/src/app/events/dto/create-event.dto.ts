import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import type { EventDto } from '@org/shared-types';

export class CreateEventDto implements Omit<EventDto, 'id'> {
  @IsString()
  @IsNotEmpty()
  nome!: string;

  @IsString()
  @IsNotEmpty()
  endereco!: string;

  @IsNumber()
  capacidade!: number;

  @IsString()
  @IsNotEmpty()
  data!: string;
}
