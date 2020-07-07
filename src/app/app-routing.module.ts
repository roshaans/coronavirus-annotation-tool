import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {VideoComponent} from './video/video.component'

const routes: Routes = [
  { path: 'task', component: VideoComponent },
  { path: 'task/:suggestedStartTime/:video', component: VideoComponent },
  { path: '',
    redirectTo: '/task',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
