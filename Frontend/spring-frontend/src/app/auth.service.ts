import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(studentname: string, studentpassword: string): Observable<boolean> {
    const bodyData = {
      studentname: studentname,
      studentpassword: studentpassword
    };
    return this.http.post<boolean>('http://localhost:8084/api/v1/student/login', bodyData);
  }
}
