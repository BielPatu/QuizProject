import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route?: ActivatedRouteSnapshot, state?: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        const { exp } = jwtDecode<{ exp: number }>(token);
        if (exp * 1000 > Date.now()) {
          return true;
        }
      } catch {
      }
    }
    this.router.navigate(['/login']);
    return false;
  }
  




}
