package com.example.demo.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;

import com.example.demo.Service.StudentServices;

import dto.LoginRequest;



@RestController
@RequestMapping("api/v1/student")
@CrossOrigin(origins = "http://localhost:4200")
public class StudentControllerLogin {
	

    @Autowired
    private StudentServices studentServices;

    @PostMapping("/login")
    public ResponseEntity<String> loginStudent(@RequestBody LoginRequest loginRequest) {
        String studentname = loginRequest.getStudentname();
        String studentpassword = loginRequest.getStudentpassword();
        
        // Perform authentication logic
        boolean isAuthenticated = studentServices.authenticate(studentname, studentpassword);
        
        if (isAuthenticated) {
            return ResponseEntity.ok("Login successful!");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect username or password");
        }
    }
}