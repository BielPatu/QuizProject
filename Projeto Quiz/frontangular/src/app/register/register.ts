import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';

  constructor(private authService: AuthService) {}

  registerUser() {
    this.authService.register(this.name, this.email, this.password).subscribe({
      next: () => {
        alert('Registro efetuado com sucesso! Faça login.');
        this.authService.logout(); 
      },
      error: (error) => {
        console.error('Erro no registro:', error);
        alert('Erro no registro: ' + (error.error?.message || 'Tente novamente. Se persistir, contate o suporte: gabrielpatu739@gmail.com'));
      }
    });
  }
}
