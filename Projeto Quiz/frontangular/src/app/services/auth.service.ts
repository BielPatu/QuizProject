import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'http://localhost:5000/auth';

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.API_URL}/login`, { email, password });
  }

  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, { name, email, password });
  }

  saveToken(token: string): void {
    localStorage.setItem('access_token', token);
  }

  redirectToHome(): void {
    this.router.navigate(['/homepage']);
  }

  logout(): void {
    localStorage.removeItem('access_token');
    this.router.navigate(['/']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getUserIdFromToken(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);
      return decoded.sub; // ajuste conforme a estrutura do seu JWT
    } catch (e) {
      console.error('Erro ao decodificar token:', e);
      return null;
    }
  }

  getUserData(): any | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Erro ao decodificar token JWT:', error);
      return null;
    }
  }



}
