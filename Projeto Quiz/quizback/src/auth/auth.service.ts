import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { validate } from 'class-validator';
import { User } from 'src/entities/user/user.entity';
import { debug } from 'console';
import { RegisterUserDto } from 'src/DTO/register-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { email } });


    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = { sub: user.id, name: user.name }; 

    const access_token = this.jwtService.sign(payload); 
    return {
      access_token,
    };
  }

  async register(data: RegisterUserDto) {
    const userDto = Object.assign(new RegisterUserDto(), data); // transforma em instância da classe
  
    const errors = await validate(userDto);
    if (errors.length > 0) {
      console.debug('Errors:', errors);
      throw new BadRequestException('Erro na validação dos dados');
    }
  
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = this.userRepository.create({
      email: data.email,
      name: data.name,
      password: hashedPassword,
    });
  
    return this.userRepository.save(user);
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
}


}

