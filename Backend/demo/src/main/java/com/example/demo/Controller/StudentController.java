package com.example.demo.Controller;

import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;

import com.example.demo.Entity.Student;
import com.example.demo.Service.StudentServices;



@RestController
@RequestMapping("api/v1/student")
@CrossOrigin(origins = "http://localhost:4200")
public class StudentController {
	

    @Autowired
    private StudentServices studentServices;

    @PostMapping("/save")
    public ResponseEntity<String> saveStudent(@RequestBody Student student) {
        try {
            studentServices.saveOrUpdate(student);
            return ResponseEntity.ok("Student saved successfully!");
        } catch (DuplicateKeyException e) {
            if (e.getMessage().contains("studentname_1_studentpassword_1")) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Duplicate username and password combination: " + student.getStudentpassword());
            } else if (e.getMessage().contains("mobile_1")) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Duplicate mobile number: " + student.getMobile());
            }
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Duplicate key error: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving student: " + e.getMessage());
        }
    }

    @GetMapping(value = "/getAll")
    public Iterable<Student> getStudents() {
        return studentServices.listAll();
    }

    @PutMapping(value = "/edit/{id}")
    public Student update(@RequestBody Student student, @PathVariable(name = "id") String _id) {
        student.set_id(_id);
        studentServices.saveOrUpdate(student);
        return student;
    }

    @DeleteMapping("/delete/{id}")
    public void deleteStudent(@PathVariable("id") String _id) {
        studentServices.deleteStudent(_id);
    }

    @GetMapping("/student/{id}")
    public Student getStudentById(@PathVariable(name = "id") String studentId) {
        return studentServices.getStudentByID(studentId);
    }

	
}
