import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Teacher } from '../interfaces/teacher';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  URL = `${environment.endPoint}Teachers/`;

  constructor(private http: HttpClient) { }

  getAllTeachers(): Observable<Teacher[]>{

    return this.http.get<Teacher[]>(`${this.URL}`);
  }

  getTeacher(id: string): Observable<Teacher>{

    return this.http.get<Teacher>(`${this.URL}${id}`);
  }

  deleteTeacher(id: number){

    return this.http.delete(`${this.URL}${id}`)
                    .pipe(
                      catchError(err => {
                        return of(err.error);
                      })
                    );
  }

  updateTeacher(teacher: Teacher){

    return this.http.put(`${this.URL}${teacher.Id}`, teacher)
                    .pipe(
                      catchError(err => {
                        return of(err.error);
                      })
                      );
  }

  createTeacher(teacher: Teacher){

    return this.http.post(`${this.URL}`, teacher)
                    .pipe(
                      catchError(err => {
                        return of(err.error);
                      })
                    );
  }

}
