import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar';

@Component({
  selector: 'app-quiz-maker',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NavbarComponent],
  templateUrl: './quiz-maker.html',
  styleUrls: ['./quiz-maker.css']
})
export class QuizMakerComponent {
  title = '';
  description = '';
  questions: {
    id: number;
    text: string;
    options: { text: string; isCorrect: boolean }[];
  }[] = [];
  private questionCounter = 0;

  constructor(private http: HttpClient) {}

  addQuestion() {
    this.questions = [
      ...this.questions,
      {
        id: this.questionCounter++,
        text: '',
        options: [
          { text: '', isCorrect: false },
          { text: '', isCorrect: false }
        ]
      }
    ];
  }

  removeQuestion(index: number) {
    this.questions.splice(index, 1);
    this.questions = [...this.questions];
  }

  updateQuestionText(index: number, text: string) {
    this.questions[index].text = text;
    this.questions = [...this.questions];
  }

  addOption(qIndex: number) {
    this.questions[qIndex].options.push({ text: '', isCorrect: false });
    this.questions = [...this.questions];
  }

  updateOptionText(qIndex: number, oIndex: number, text: string) {
    this.questions[qIndex].options[oIndex].text = text;
    this.questions = [...this.questions];
  }

  setCorrectOption(qIndex: number, oIndex: number) {
    this.questions[qIndex].options = this.questions[qIndex].options.map(
      (opt, idx) => ({
        ...opt,
        isCorrect: idx === oIndex,
      })
    );
    this.questions = [...this.questions];
  }

  removeOption(qIndex: number, oIndex: number) {
    if (this.questions[qIndex].options.length <= 2) {
      alert('Cada pergunta deve ter pelo menos duas opções');
      return;
    }
    this.questions[qIndex].options.splice(oIndex, 1);
    this.questions = [...this.questions];
  }

  async handleSubmit() {
    if (!this.title.trim()) {
      alert('Digite o título do quiz');
      return;
    }
    if (this.questions.length === 0) {
      alert('Adicione pelo menos uma pergunta');
      return;
    }

    for (const q of this.questions) {
      if (!q.options.some(opt => opt.isCorrect)) {
        alert('Cada pergunta deve ter uma opção correta marcada');
        return;
      }
    }

    for (const q of this.questions) {
      if (q.text.trim() === '') {
        alert('Não deixe perguntas vazias');
        return;
      }
      if (q.options.length < 2) {
        alert('Cada pergunta deve ter pelo menos duas opções');
        return;
      }
      for (const opt of q.options) {
        if (opt.text.trim() === '') {
          alert('Não deixe opções vazias');
          return;
        }
      }
    }

    const cleanedQuestions = this.questions.map(q => ({
      text: q.text,
      options: q.options.map(opt => ({
        text: opt.text,
        isCorrect: opt.isCorrect,
      })),
    }));

    try {
      await this.http.post(
        'http://localhost:5000/quiz',
        {
          title: this.title,
          description: this.description,
          questions: cleanedQuestions,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        }
      ).toPromise();

      alert('Quiz criado com sucesso!');
      this.title = '';
      this.description = '';
      this.questions = [];
      this.questionCounter = 0;
    } catch (error) {
      console.error('Erro ao criar quiz:', error);
      alert('Erro ao criar quiz. Tente novamente Mais tarde.');
    }
  }
}
