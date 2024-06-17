package com.example.demo.Controller;

import com.example.demo.Entity.Student;
import com.example.demo.Service.StudentServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/student")
@CrossOrigin(origins = "http://localhost:4200")
public class StudentController {

    @Autowired
    private StudentServices studentServices;

    @PostMapping(value = "/save")
    public String saveStudent(@RequestBody Student students) {
        studentServices.saveOrUpdate(students);
        return students.get_id();
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
