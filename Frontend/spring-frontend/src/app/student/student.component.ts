import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  StudentArray: any[] = [];
  studentname: string = "";
  studentaddress: string = "";
  mobile: number = 0;
  currentStudentID: string = "";

  
  // To make http request to the backend API
  constructor(private http: HttpClient) {}

  // It calls getAllStudent to fetch and display all student records when the component loads.
  ngOnInit(): void {
    this.getAllStudent();
  }


  register() {

    // creates a constant object bodyData which includes current value of student details from the component
    const bodyData = {
      studentname: this.studentname,
      studentaddress: this.studentaddress,
      mobile: this.mobile
    };
    console.log('Registering student with data:', bodyData);

    
    // send a POST request
    // The subscribe method is used to handle the observable returned by the post method. 
    // The next function is called when the request is successful.
    this.http.post("http://localhost:8084/api/v1/student/save", bodyData, { responseType: 'text' }).subscribe({
      next: (resultData: any) => {
        console.log(resultData);
        alert("Student Registered Successfully");
        this.getAllStudent();
        this.clearForm();
      },
      error: (error) => {
        console.error('Error registering student:', error);
      }
    });
  }


  getAllStudent() {
    console.log('Fetching all students');
    this.http.get("http://localhost:8084/api/v1/student/getAll").subscribe({
      next: (resultData: any) => {
        console.log('Fetched students:', resultData);

        // Assigns the fetched data to the Updating StudentArray
        this.StudentArray = resultData;
      },
      error: (error) => {
        console.error('Error fetching students:', error);
      }
    });
  }

  setUpdate(data: any) {
    console.log('Setting student for update:', data);
    this.studentname = data.studentname;
    this.studentaddress = data.studentaddress;
    this.mobile = data.mobile;
    this.currentStudentID = data._id;
  }

  updateRecords() {
    const bodyData = {
      studentname: this.studentname,
      studentaddress: this.studentaddress,
      mobile: this.mobile
    };

    console.log('Updating student with ID:', this.currentStudentID, 'and data:', bodyData);

    this.http.put(`http://localhost:8084/api/v1/student/edit/${this.currentStudentID}`, bodyData, { responseType: 'text' }).subscribe({
      next: (resultData: any) => {
        console.log(resultData);
        alert("Student Record Updated");
        this.getAllStudent();
        this.clearForm();
      },
      error: (error) => {
        console.error('Error updating student:', error);
      }
    });
  }

  save() {
    console.log('Saving student');
    if (this.currentStudentID === '') {
      this.register();
    } else {
      this.updateRecords();
    }
  }

  setDelete(data: any) {
    console.log('Deleting student with ID:', data._id);

    this.http.delete(`http://localhost:8084/api/v1/student/delete/${data._id}`, { responseType: 'text' }).subscribe({
      next: (resultData: any) => {
        console.log(resultData);
        alert("Student Deleted");
        this.getAllStudent();
        this.clearForm();
      },
      error: (error) => {
        console.error('Error deleting student:', error);
      }
    });
  }

  clearForm() {
    console.log('Clearing form');
    this.studentname = '';
    this.studentaddress = '';
    this.mobile = 0;
    this.currentStudentID = '';
  }
}
