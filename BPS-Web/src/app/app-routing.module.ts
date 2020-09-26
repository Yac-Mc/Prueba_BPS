import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { StudentComponent } from './pages/student/student.component';
import { TeacherComponent } from './pages/teacher/teacher.component';
import { NoteComponent } from './pages/note/note.component';
import { UpdateNewTeachStudComponent } from './components/update-new-teach-stud/update-new-teach-stud.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'student', component: StudentComponent },
  { path: 'teacher', component: TeacherComponent},
  { path: 'note', component: NoteComponent},
  { path: 'update-new/:id/:type', component: UpdateNewTeachStudComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
