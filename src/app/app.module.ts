import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import {MatButtonModule} from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VgCoreModule } from 'videogular2/compiled/core';
import { VgControlsModule } from 'videogular2/compiled/controls';
import { VgOverlayPlayModule } from 'videogular2/compiled/overlay-play';
import { MatSliderModule } from '@angular/material/slider';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import { TimePipe } from './time.pipe';
import {MatExpansionModule} from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VideoComponent } from './video/video.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    TimePipe,
    AppComponent,
    VideoComponent
  ],
  imports: [    BrowserAnimationsModule,
    MatSnackBarModule,
    MatExpansionModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    BrowserModule,
    MatCardModule,
    MatTabsModule,
    MatButtonModule,
    MatSidenavModule,
    MatExpansionModule,

    MatSliderModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]})
export class AppModule { }
