import { Component } from '@angular/core';
import { VgPlayer, VgAPI } from 'videogular2/compiled/core';
import {ActivatedRoute} from '@angular/router'
import { Router } from '@angular/router';
// import {filter} from 'rxjs/add/operator/filter';
import { filter,map,mergeMap } from 'rxjs/operators';


import { NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  bothTimeClicked = false;

  routeData;
  startPressed = false; 
  endPressed = false;

  startTimeClicked = false;
  endTimeClicked = false;

  //Keep track of start and end time
  startTime = 0;
  endTime = 0;

  startTimeVideo = "NONE SELECTED";
  endTimeVideo = "NONE SELECTED";

  suggestedStartTime = 45;

  //For interacting with VGPlayer
  api: VgAPI;

  //Video File to play
  currentItem = "https://wesmedia.wesleyan.edu/covid/xWAGA_03_01_1.mp4";

  //Qualtrics Link
  qualtricsLink = 'https://wesleyan.co1.qualtrics.com/jfe/form/SV_4IKRVKX9VC415Yh?'

  //show Buttons
  showController = true;


  constructor(private activatedRoute: ActivatedRoute,private router: Router,
  ) {
    console.log(this.activatedRoute.snapshot.paramMap.getAll)
  }

  //Seek to suggested start time
  seekToSuggested(){
    if (this.api.isPlayerReady == true){
      this.api.seekTime(this.suggestedStartTime)

    }
  }

  //Call when the player initially runs
  onPlayerReady(api:VgAPI) {
    this.api = api;
    // this.seekToSuggested()
    // this.api.getDefaultMedia().subscriptions.ended.subscribe(
    //   () => {
    //       // Set the video to the beginning
    //       this.api.getDefaultMedia().currentTime = 20;
    //     });
  }
  

  ngOnInit() {
    this.getInfo();
  }
  nextClicked() {
    this.showController = false;
    this.qualtricsLink +=  'storystartvideo=' + this.startTimeVideo + '&storystarttime=' + this.startTime 
    + '&storyendvideo=' + this.endTimeVideo + '&storyendtime=' + this.endTime 
    // + '&market=' + this.market + '&text=' + this.textSnippet
    window.open(this.qualtricsLink, "_blank" )
  }

  //Get suggest start time and video from from the URL
  getInfo() {
    console.log(this.suggestedStartTime + "hi1")
    this.suggestedStartTime = Number(this.activatedRoute.snapshot.paramMap.get('suggestedStartTime'))
    console.log(this.suggestedStartTime + "hi2")
    console.log(this.activatedRoute.snapshot.paramMap.get('suggestedStartTime'))
    // this.currentItem += this.activatedRoute.snapshot.paramMap.get('video')
    this.activatedRoute.paramMap.subscribe( (params) => {
          console.log(params)
        }
      )
    }
}
