import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TeacherComponent } from './pages/teacher/teacher.component';
import { StudentComponent } from './pages/student/student.component';
import { NoteComponent } from './pages/note/note.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { LoadingComponent } from './components/loading/loading.component';
import { TableTeachStudComponent } from './components/table-teach-stud/table-teach-stud.component';
import { UpdateNewTeachStudComponent } from './components/update-new-teach-stud/update-new-teach-stud.component';

@NgModule({
  declarations: [
    AppComponent,
    TeacherComponent,
    StudentComponent,
    NoteComponent,
    NavbarComponent,
    HomeComponent,
    LoadingComponent,
    TableTeachStudComponent,
    UpdateNewTeachStudComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
