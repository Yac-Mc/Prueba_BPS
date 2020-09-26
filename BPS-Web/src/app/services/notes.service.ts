import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Note } from '../interfaces/note';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  URL = `${environment.endPoint}Notes/`;

  constructor(private http: HttpClient) { }

  getAllNotes(): Observable<Note[]>{
    return this.http.get<Note[]>(`${this.URL}`);
  }

  getNotes(id: string): Observable<Note>{
    return this.http.get<Note>(`${this.URL}${id}`);
  }

  createNote(note: Note){

    return this.http.post(`${this.URL}`, note)
                    .pipe(
                      catchError(err => {
                        return of(err.error);
                      })
                    );

  }

  deleteNote(id: number){

    return this.http.delete(`${this.URL}${id}`)
                    .pipe(
                      catchError(err => {
                        return of(err.error);
                      })
                    );
  }
}
