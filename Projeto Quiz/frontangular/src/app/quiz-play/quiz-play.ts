import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { QuizService } from '../services/quiz.service';
import { AuthService } from '../services/auth.service';
import { jwtDecode } from 'jwt-decode';
import {
  trigger,
  transition,
  style,
  animate,
} from '@angular/animations';
import { NavbarComponent } from '../navbar/navbar';





@Component({
  selector: 'app-quiz-play',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NavbarComponent],
  templateUrl: './quiz-play.html',
  styleUrls: ['./quiz-play.css'],
  animations: [
    trigger('fadeSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(30px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateX(-30px)' }))
      ])
    ])
  ]
  
})
export class QuizPlayComponent implements OnInit {
  quiz: any = null;
  answers: Record<string, string> = {};
  score: number | null = null;

  constructor(
    private quizService: QuizService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const quizId = localStorage.getItem('selectedQuizId');
    if (!quizId) {
      console.error('Nenhum quiz selecionado');
      alert('Erro ao se conectar ao Quiz. Tente novamente mais tarde.');
      return;
    }

    this.quizService.getQuizById(quizId).subscribe({
      next: (data) => (this.quiz = data),
      error: (err) => console.error('Erro ao buscar quiz:', err)
    });
  }

  handleRadioChange(questionId: string, optionId: string): void {
    this.answers[questionId] = optionId;
  }

  handleSubmit(): void {
    let tempScore = 0;

  this.quiz.questions.forEach((q: any) => {
    const correct = q.options.find((o: any) => o.isCorrect);
    if (this.answers[q.id] === correct?.id) {
      tempScore += 1;
    }
  });

  this.score = tempScore;

    const token = this.authService.getToken();
    const userId = this.authService.getUserIdFromToken();

    if (token && userId) {
      this.quizService.submitScore({
        userId,
        quizId: this.quiz.id,
        score: tempScore
      }, token).subscribe({
        next: () => console.log('Score salvo com sucesso'),
        error: (err) => alert('Erro ao salvar o score. Tente novamente mais tarde.')
      });
    }
  }

  backToHome(): void {
    this.router.navigate(['/homepage']);
  }

  currentQuestionIndex = 0;

get currentQuestion() {
  return this.quiz?.questions[this.currentQuestionIndex];
}

nextQuestion(): void {
  if (this.currentQuestionIndex < this.quiz.questions.length - 1) {
    this.currentQuestionIndex++;
  }
}

  previousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  isLastQuestion(): boolean {
    return this.currentQuestionIndex === this.quiz.questions.length - 1;
  }

  isFirstQuestion(): boolean {
    return this.currentQuestionIndex === 0;
  }

  resetQuiz(): void {
    this.score = null;
    this.answers = {};
    this.currentQuestionIndex = 0;
  }
  

}
