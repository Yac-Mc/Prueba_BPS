import { Component, OnInit } from '@angular/core';
import { Student } from '../../interfaces/student';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  students: Student[] = [];
  loading = true;

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.studentService.getAllStudents().subscribe(result => {
      this.students = result;
      this.loading = false;
    });
  }

}
