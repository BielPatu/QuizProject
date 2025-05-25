import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from 'src/DTO/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.authService.validateUser(body.email, body.password);

    if (!user) {
      throw new BadRequestException('Credenciais inválidas');
    }

    return this.authService.login(user);
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() data: RegisterUserDto) {
    const existingUser = await this.authService.findUserByEmail(data.email);
    if (existingUser) {
      throw new BadRequestException('Usuário já cadastrado!');
    }

    console.log('Dados recebidos para registro:', data);
    const newUser = await this.authService.register(data);

    return {
      message: 'Usuário registrado com sucesso!',
      user: newUser,
    };
  }
}
