import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar';
import { UserHistoryComponent } from '../history/user-history.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, NavbarComponent, UserHistoryComponent],
  templateUrl: '/profileComponent.html', 
  styles: ['/profile.css']
})
export class ProfileComponent implements OnInit {
  user: any = null;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('access_token');
    if (!token) {
      this.router.navigate(['/']);
      return;
    }

    let userId: string;
    try {
      userId = (JSON.parse(atob(token.split('.')[1]))).sub;
    } catch {
      this.router.navigate(['/']);
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get(`http://localhost:5000/users/${userId}`, { headers })
      .subscribe({
        next: (data) => this.user = data,
        error: (err) => {
          console.error('Erro ao buscar o perfil:', err);
          alert('Erro ao carregar o perfil. Tente novamente mais tarde.');
          this.router.navigate(['/']);
        }
      });
  }
}
