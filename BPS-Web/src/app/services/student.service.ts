import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Student } from '../interfaces/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  URL = `${environment.endPoint}Students/`;

  constructor(private http: HttpClient) { }

  getAllStudents(): Observable<Student[]>{
    return this.http.get<Student[]>(`${this.URL}`);
  }

  getStudent(id: string): Observable<Student>{
    return this.http.get<Student>(`${this.URL}${id}`);
  }

  deleteStudent(id: number){

    return this.http.delete(`${this.URL}${id}`)
                    .pipe(
                      catchError(err => {
                        return of(err.error);
                      })
                    );
  }

  updateStudent(student: Student){

    return this.http.put(`${this.URL}${student}`, student)
                    .pipe(
                      catchError(err => {
                        return of(err.error);
                      })
                    );
  }

  createStudent(student: Student){

    return this.http.post(`${this.URL}`, student)
                    .pipe(
                      catchError(err => {
                        return of(err.error);
                      })
                    );

  }
}
