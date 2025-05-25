import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "../question/question.entity";
import { UserQuizScore } from "../userScore/user-score.entity";



@Entity()
export class Quiz {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true, default: null })
  description: string;

  @OneToMany(() => Question, question => question.quiz, { cascade: true })
  questions: Question[];

  @OneToMany(() => UserQuizScore, (userScore) => userScore.quiz)
  scores: UserQuizScore[];
  userQuizScores: any;

}
