import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz } from './quiz.entity';
import { Repository } from 'typeorm';
import { CreateQuizDto } from 'src/DTO/create-quiz.dto';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,
  ) {}

  async create(data: CreateQuizDto): Promise<Quiz> {
  const quiz = this.quizRepository.create({
    title: data.title,
    description: data.description,
    questions: data.questions.map((q) => ({
      text: q.text,
      options: q.options.map((o) => ({
        text: o.text,
        isCorrect: o.isCorrect,
      })),
    })),
  });

  return this.quizRepository.save(quiz);
}

  findAll(): Promise<Quiz[]> {
    return this.quizRepository.find({ relations: ['questions', 'questions.options'] });
  }

  async findOne(id: number): Promise<Quiz> {
    const saveState = await this.quizRepository.findOne({ where: { id }, relations: ['questions', 'questions.options'] });
    if (!saveState) {
        throw new Error('ID is required');
        } else {}
    return saveState;
}


  async remove(id: number): Promise<void> {
    await this.quizRepository.delete(id);
  }
}

