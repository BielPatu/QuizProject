import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './question.entity';
import { Repository } from 'typeorm';
import { CreateQuestionDto } from 'src/DTO/create-question.dto';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {}

  async create(data: CreateQuestionDto): Promise<Question> {
    const question = this.questionRepository.create(data);
    return this.questionRepository.save(question);
  }

  async findAll(): Promise<Question[]> {
    return this.questionRepository.find({ relations: ['quiz', 'options'] });
  }

  async findOne(id: number): Promise<Question> {
    const saveState = await this.questionRepository.findOne({ where: { id }, relations: ['quiz', 'options'] })
    if (!saveState) {
      throw new Error('ID is required');
  }
    return saveState;
  }

  async remove(id: number): Promise<void> {
    await this.questionRepository.delete(id);
  }
}

