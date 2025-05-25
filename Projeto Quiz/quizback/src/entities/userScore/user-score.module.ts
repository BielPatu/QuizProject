import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserScoreService } from './user-score.service';
import { UserScoreController } from './user-score.controller';
import { UserQuizScore } from './user-score.entity';
import { User } from '../user/user.entity';
import { Quiz } from '../quiz/quiz.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserQuizScore, User, Quiz])],
  providers: [UserScoreService],
  controllers: [UserScoreController],
  exports: [UserScoreService], // Se for usar em outros módulos
})
export class UserScoreModule {}
