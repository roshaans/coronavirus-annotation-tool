import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {VideoComponent} from './video/video.component'

const routes: Routes = [
  { path: '', component: VideoComponent },
  { path: ':MarketName/:station/:program_title/:offset/:Text/:bcastid/:hitid/:coder', component: VideoComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
