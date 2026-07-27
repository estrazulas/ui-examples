import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { IsNotEmpty, IsString } from 'class-validator';
import { ORGANIZER, FAKE_TOKEN } from './organizer';

class LoginDto {
  @IsString()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  senha!: string;
}

@Controller('auth')
export class AuthController {
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() dto: LoginDto): { token: string } {
    if (dto.email !== ORGANIZER.email || dto.senha !== ORGANIZER.senha) {
      throw new UnauthorizedException('Credenciais invalidas');
    }
    return { token: FAKE_TOKEN };
  }
}
