import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import Swal from 'sweetalert2';

import { StudentService } from '../../services/student.service';
import { TeacherService } from '../../services/teacher.service';
import { Teacher } from 'src/app/interfaces/teacher';
import { Student } from '../../interfaces/student';

@Component({
  selector: 'app-update-new-teach-stud',
  templateUrl: './update-new-teach-stud.component.html',
  styleUrls: ['./update-new-teach-stud.component.css']
})
export class UpdateNewTeachStudComponent implements OnInit {

  form: FormGroup;
  id = '';
  type = '';

  constructor(private router: ActivatedRoute, private router2: Router, private formBuilder: FormBuilder,
              private studentService: StudentService, private teacherService: TeacherService) {

    this.generateForm();
  }

  ngOnInit(): void {

    this.id = this.router.snapshot.paramMap.get('id');
    this.type = this.router.snapshot.paramMap.get('type');

    if (this.id !== 'nuevo'){

      if (this.type === 'profesor'){
        this.teacherService.getTeacher(this.id).subscribe((resp: Teacher) => {
          this.form.get('id').setValue(this.id);
          this.form.get('name').setValue(resp.TeacherName);
        });
      }else{
        this.studentService.getStudent(this.id).subscribe((resp: Student) => {
          this.form.get('id').setValue(this.id);
          this.form.get('name').setValue(resp.StudentName);
        });
      }
    }
  }

  generateForm(){
    this.form = this.formBuilder.group({
      id: ['', [ Validators.required ]],
      name: ['', [ Validators.required ]]
    });
  }

  saveRegister(){

    if (this.form.invalid) { return; }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<any>;
    let teacher: Teacher;
    let student: Student;
    let id = '';
    let name = '';
    let msg = '';

    if (this.type === 'profesor'){
      teacher = {
        Id: this.form.value.id,
        TeacherName: this.form.value.name
      };
      id = this.form.value.id;
      name = this.form.value.name;
    }else{
      student = {
        Id: this.form.value.id,
        StudentName: this.form.value.name
      };
      id = this.form.value.id;
      name = this.form.value.name;
    }

    if (this.id !== 'nuevo'){
      msg = `El ${this.type} se actualizó correctamente`;
      if (this.type === 'profesor'){
        peticion = this.teacherService.updateTeacher(teacher);
      }else{
        peticion = this.studentService.updateStudent(student);
      }
    }else{
      msg = `El ${this.type} se creo correctamente`;
      if (this.type === 'profesor'){
        peticion = this.teacherService.createTeacher(teacher);
      }else{
        peticion = this.studentService.createStudent(student);
      }
    }

    peticion.subscribe(resp => {

      if (!resp){
        Swal.fire({
          title: name,
          text: msg,
          icon: 'success'
        });

        this.form.get('name').setValue(name);
        this.form.get('id').setValue(id);
      }else{
        Swal.fire({
          title: 'Oops!',
          text: 'Ha ocurrido un error al procesar la solicitud',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    });
  }

  return(){
    if (this.type === 'profesor'){
      this.router2.navigate(['teacher']);
    }else{
      this.router2.navigate(['student']);
    }
  }

}
