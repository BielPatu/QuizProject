import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule]
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  lembrarDeMim: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  loginValidation() {
    if (!this.email || !this.password) {
      alert('Preencha todos os campos');
      return;
    }
    console.log(this.email, this.password)

    this.http.post('http://localhost:5000/auth/login', {
      email: this.email,
      password: this.password,
    }).subscribe({
      next: (res: any) => {
        localStorage.setItem('access_token', res.access_token);
        this.router.navigate(['/homepage']);
      },
      error: (err) => {
        console.error('Erro ao fazer login:', err);
        alert('Email ou senha inválidos');
      }
    });
  }
  
}
