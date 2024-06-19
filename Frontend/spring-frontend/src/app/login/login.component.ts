import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';  // Adjust the path as necessary

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  studentname: string = '';
  studentpassword: string = '';

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  login() {
    const bodyData = {
      studentname: this.studentname,
      studentpassword: this.studentpassword
    };

    this.http.post<any>('http://localhost:8084/api/v1/student/login', bodyData)
      .subscribe({
        next: (response: any) => {
          console.log(response); // Log the response for debugging
          if (response.message === 'Login successful!') {
            this.authService.login(); // Set login state
            alert("Login successful!"); // Or redirect to another page
            this.router.navigate(['/home']); // Redirect to welcome page or home
          } else {
            alert("Incorrect username or password");
          }
        },
        error: (error) => {
          console.error('Error logging in:', error);
          alert("Error logging in: " + error.message);
        }
      });
  }
}
