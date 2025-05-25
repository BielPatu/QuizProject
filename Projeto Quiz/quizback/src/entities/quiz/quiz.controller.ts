import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from 'src/DTO/create-quiz.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() data: CreateQuizDto) {
    return this.quizService.create(data);
  }

  @Get()
  findAll() {
    return this.quizService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: Number) {
    return this.quizService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.quizService.remove(+id);
  }
}

