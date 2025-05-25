import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { UserQuizScore } from './user-score.entity';
import { Repository } from 'typeorm';
import { Quiz } from '../quiz/quiz.entity';

@Injectable()
export class UserScoreService {
    constructor(
        @InjectRepository(UserQuizScore)
        private readonly repo: Repository<UserQuizScore>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Quiz)
        private readonly quizRepository: Repository<Quiz>,
        @InjectRepository(UserQuizScore)
        private readonly userScoreRepository: Repository<UserQuizScore>,
      ) {}
      
      async findAll() {
        return this.repo.find({ relations: ['user', 'quiz'] });
      }
      
      async findOne(id: number) {
        return this.repo.findOne({ where: { id }, relations: ['user', 'quiz'] });
      }

    async saveScore(userId: number, quizId: number, score: number) {
        const user = await this.userRepository.findOneBy({ id: userId });
        const quiz = await this.quizRepository.findOneBy({ id: quizId });
      
        const entry = this.repo.create({ user, quiz, score } as Partial<UserQuizScore>);
        return this.repo.save(entry);
      }


      async getScoresByUser(userId: number) {
        return this.userScoreRepository.find({
          where: { user: { id: userId } },
          relations: ['quiz', 'quiz.questions'], 
          order: { createdAt: 'DESC' }
        });
      }
}
