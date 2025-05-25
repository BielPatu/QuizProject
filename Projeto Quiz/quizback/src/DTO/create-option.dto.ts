import { IsBoolean, IsString } from 'class-validator';

export class CreateOptionDto {
  @IsString()
  text: string;

  @IsBoolean()
  isCorrect: boolean;
}
