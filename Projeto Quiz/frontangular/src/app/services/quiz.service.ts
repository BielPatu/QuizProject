import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private readonly API = 'http://localhost:5000';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getQuizzes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/quiz`);
  }

  getUserScores(): Observable<any[]> {
    const token = this.authService.getToken();
    const userId = this.authService.getUserIdFromToken();
  
    if (!token || !userId) {
      return throwError(() => new Error('Usuário não autenticado.'));
    }
  
    return this.http.get<any[]>(`${this.API}/user-score/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }


  getQuizById(id: string): Observable<any> {
    return this.http.get<any>(`${this.API}/quiz/${id}`);
  }

  submitScore(payload: any, token: string): Observable<any> {
    return this.http.post(`http://localhost:5000/user-score/submit`, payload, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  
}
