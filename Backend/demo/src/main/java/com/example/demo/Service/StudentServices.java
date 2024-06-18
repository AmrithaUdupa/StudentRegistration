package com.example.demo.Service;

import com.example.demo.Entity.Student;
import com.example.demo.Repository.StudentRepo;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentServices {

    @Autowired
    private StudentRepo repo;

    public void saveOrUpdate(Student student) {
    	try {
    		repo.save(student);
        } catch (DuplicateKeyException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException("Error saving student", e);
        }
        repo.save(student);
    }

    public Iterable<Student> listAll() {
        return repo.findAll();
    }

    public void deleteStudent(String id) {
        repo.deleteById(id);
    }

    public Student getStudentByID(String studentid) {
        return repo.findById(studentid).orElse(null);
    }

    public boolean authenticate(String studentname, String studentpassword) {
        Student student = repo.findByStudentname(studentname);
        
        // Check if student exists and compare passwords
        if (student != null && student.getStudentpassword().equals(studentpassword)) {
            return true; // Authentication successful
        }
        return false; // Authentication failed
    }
}
