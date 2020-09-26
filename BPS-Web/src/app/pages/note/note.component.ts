import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import Swal from 'sweetalert2';

import { NotesService } from '../../services/notes.service';
import { Note } from '../../interfaces/note';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  loading = true;
  notes: Note[] = [];
  closeResult: string;
  NoteName = '';
  IdTeacher = '';
  IdStudent = '';

  constructor(private notesService: NotesService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.notesService.getAllNotes().subscribe(result => {
      this.notes = result;
      this.loading = false;
    });
  }

  addRegister(content){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      const newNote: Note = {
        Id: 1,
        NoteName: this.NoteName,
        IdTeacher: Number(this.IdTeacher),
        IdStudent: Number(this.IdStudent)
      };
      this.notesService.createNote(newNote).subscribe(resp => {
        if (resp.Id){
          Swal.fire({
            title: name,
            text: 'Nota creada con éxito',
            icon: 'success'
          });
        }
        else{
          Swal.fire({
            title: 'Oops!',
            text: 'Ha ocurrido un error al procesar la solicitud',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
        this.closeResult = `Closed with`;
        this.ngOnInit();
      });
    }, () => {
      this.closeResult = `Dismissed`;
    });
  }

  updateRegister(note: Note, i: number){

  }

  deleteRegister(note: Note, i: number){
    Swal.fire({
      title: '¿Esta seguro?',
      text: `Esta seguro que desea borrar a ${note.NoteName}`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(respAlert => {

        if (respAlert.value){

          this.notesService.deleteNote(note.Id).subscribe(resp => {
            this.notes.splice(i, 1);
          });
        }
      });
  }

}
