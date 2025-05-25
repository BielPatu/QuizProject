import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from 'src/DTO/create-question.dto';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  create(@Body() data: CreateQuestionDto) {
    return this.questionService.create(data);
  }

  @Get()
  findAll() {
    return this.questionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionService.remove(+id);
  }
}

