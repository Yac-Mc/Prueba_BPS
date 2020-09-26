import { Component, OnInit } from '@angular/core';
import { Teacher } from '../../interfaces/teacher';
import { TeacherService } from '../../services/teacher.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  loading = true;
  teachers: Teacher[] = [];

  constructor(private teacherService: TeacherService) {}

  ngOnInit(): void {
    this.teacherService.getAllTeachers().subscribe(result => {
      this.teachers = result;
      this.loading = false;
    });
  }

}
