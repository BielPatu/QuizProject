import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class NavbarComponent implements OnInit {
  userName: string = 'Usuário';

  constructor(private auth: AuthService) {}


  logout(): void {
    this.auth.logout();
  }

  ngOnInit(): void {
  const userData = this.auth.getUserData();
  if (userData && userData.name) {
    this.userName = userData.name;
  }
}


}
