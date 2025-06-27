import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {jwtDecode} from 'jwt-decode';

@Component({
  selector: 'app-user-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.css']
})
export class UserHistoryComponent implements OnInit {
  scores: any[] = [];
  loading = true;

  // Paginação
  currentPage = 1;
  pageSize = 5;
  pagedScores: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('access_token');
    if (!token) {
      this.router.navigate(['/']);
      return;
    }

    const userId = (jwtDecode(token) as any).sub;

    this.http.get(`http://localhost:5000/user-score/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (res: any) => {
        this.scores = res;
        this.loading = false;
        this.updatePagedScores();
      },
      error: (err) => {
        console.error('Erro ao carregar histórico:', err);
        this.router.navigate(['/login']);
      }
    });
  }

  get totalPages(): number {
    return Math.ceil(this.scores.length / this.pageSize);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePagedScores();
  }

  private updatePagedScores(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedScores = this.scores.slice(start, end);
  }
}
