import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly LOGIN_KEY = 'isLoggedIn';

  login() {
    localStorage.setItem(this.LOGIN_KEY, 'true');
  }

  logout() {
    localStorage.removeItem(this.LOGIN_KEY);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(this.LOGIN_KEY) === 'true';
  }
}
