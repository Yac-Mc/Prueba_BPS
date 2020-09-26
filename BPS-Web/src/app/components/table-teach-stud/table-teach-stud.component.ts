import { Component, OnInit, Input } from '@angular/core';

import Swal from 'sweetalert2';

import { Student } from 'src/app/interfaces/student';
import { Teacher } from '../../interfaces/teacher';
import { TeacherService } from '../../services/teacher.service';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-table-teach-stud',
  templateUrl: './table-teach-stud.component.html',
  styleUrls: ['./table-teach-stud.component.css']
})
export class TableTeachStudComponent implements OnInit {

  @Input() teachers: Teacher[];
  @Input() students: Student[];

  constructor(private teacherService: TeacherService, private studentService: StudentService) { }

  ngOnInit(): void {
  }

  deleterRegister(object: any, i: number, type: string){

    const name = type === 'profesor' ? object.TeacherName : object.StudentName;
    Swal.fire({
      title: '¿Esta seguro?',
      text: `Esta seguro que desea borrar a ${name}`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(respAlert => {

        if (respAlert.value){
          if (type === 'profesor'){
            this.teacherService.deleteTeacher(object.Id).subscribe(resp => {
              this.teachers.splice(i, 1);
            });
          }else{
            this.studentService.deleteStudent(object.Id).subscribe(resp => {
              this.students.splice(i, 1);
            });
          }
        }
      });
  }

}
