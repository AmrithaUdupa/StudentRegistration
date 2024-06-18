import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  studentname: string = ''; // Initialize with empty string
  studentpassword: string = ''; // Initialize with empty string

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.studentname, this.studentpassword).subscribe({
      next: (isLoggedIn: boolean) => {
        if (isLoggedIn) {
          this.router.navigate(['/welcome']); // Navigate to welcome page on successful login
        } else {
          alert('Wrong username or password');
        }
      },
      error: (error) => {
        console.error('Error logging in:', error);
        alert('Error logging in: ' + error.message);
      }
    });
  }
}
