import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar';
import {jwtDecode} from 'jwt-decode'; 
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, NavbarComponent, RouterModule],
  templateUrl: './homepage.html',
  styleUrls: ['./homepage.css']
})
export class HomepageComponent implements OnInit {
  quizzes: any[] = [];
  userScores: Record<string, number> = {};
  loading = true;
  userName: string = 'Usuário';

  currentPage = 1;
  pageSize = 23;
  pagedQuizzes: any[] = [];

  constructor(private http: HttpClient, private router: Router, private auth: AuthService) {}

  ngOnInit(): void {

    const userData = this.auth.getUserData();
    if (userData && userData.name) {
      this.userName = userData.name;
    }


    this.http.get<any[]>('http://localhost:5000/quiz').subscribe({
      next: (res) => {
        this.quizzes = res;
        this.loading = false;
        this.updatePagedQuizzes();
        this.loadUserScores(); // opcional
      },
      error: (err) => {
        console.error('Erro ao buscar quizzes:', err);
        alert('Erro ao carregar quizzes. Tente reiniciar a página.');
      }
    });
  }

  get totalPages(): number {
    return Math.ceil(this.quizzes.length / this.pageSize);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePagedQuizzes();
  }

  private updatePagedQuizzes(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedQuizzes = this.quizzes.slice(start, end);
  }

  handleSelectQuiz(quizId: string): void {
    localStorage.setItem('selectedQuizId', quizId);
    this.router.navigate(['/quiz', quizId]);
  }

  private loadUserScores(): void {
    
    const token = localStorage.getItem('access_token'); 
  
    if (!token) return;
  
    const userId = (jwtDecode(token) as any).sub;
  
    this.http.get<any[]>(`http://localhost:5000/user-score/${userId}`, {
      headers: { Authorization: `Bearer ${token}` } 
    }).subscribe((scores) => {
        scores.forEach(score => {
          if (score.quiz && score.quiz.id != null) {
            const quizId = score.quiz.id.toString();
            const currentHigh = this.userScores[quizId] ?? 0;
            if (score.score > currentHigh) {
              this.userScores[quizId] = score.score;
            }
          }
        });
    });
  }

  
  
}