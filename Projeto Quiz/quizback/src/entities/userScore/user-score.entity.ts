import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { Quiz } from '../quiz/quiz.entity';
import { Question } from '../question/question.entity';


@Entity()
export class UserQuizScore {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  score: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Question, (questions) => questions)
  questions: Question[];

  @ManyToOne(() => User, (user) => user.scores)
  user: User;

  @ManyToOne(() => Quiz, (quiz) => quiz.scores)
  quiz: Quiz;
}