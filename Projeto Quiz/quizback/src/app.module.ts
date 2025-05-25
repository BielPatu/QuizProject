import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './entities/user/user.service';
import { UserController } from './entities/user/user.controller';
import { User } from './entities/user/user.entity';
import { OptionService } from './entities/option/option.service';
import { OptionController } from './entities/option/option.controller';
import { Question } from './entities/question/question.entity';
import { QuestionController } from './entities/question/question.controller';
import { QuestionService } from './entities/question/question.service';
import { Option } from './entities/option/option.entity';
import { Quiz } from './entities/quiz/quiz.entity';
import { QuizModule } from './entities/quiz/quiz.module';
import { OptionModule } from './entities/option/option.module';
import { QuestionModule } from './entities/question/question.module';
import { UserScoreController } from './entities/userScore/user-score.controller';
import { UserScoreService } from './entities/userScore/user-score.service';
import { UserScoreModule } from './entities/userScore/user-score.module';
import { UserQuizScore } from './entities/userScore/user-score.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './entities/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT', 3306),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [Quiz, User, Option, Question, UserQuizScore],
        synchronize: true,
      }),
    }),
    QuizModule,
    OptionModule,
    QuestionModule,
    UserScoreModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
