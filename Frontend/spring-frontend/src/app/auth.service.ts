import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(studentname: string, studentpassword: string) {
    const bodyData = { studentname, studentpassword };
    return this.http.post<any>('http://localhost:8084/api/v1/student/login', bodyData);
  }
}
