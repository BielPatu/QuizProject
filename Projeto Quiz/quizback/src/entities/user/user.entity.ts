import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserQuizScore } from "../userScore/user-score.entity";



@Entity()
export class User
{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;


    @CreateDateColumn()
    createdAt: Date;

        @OneToMany(() => UserQuizScore, userScore => userScore.user)
        quizScores: UserQuizScore[];
        userQuizScores: any;
        scores: any;

}