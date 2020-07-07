import { Component, OnInit } from '@angular/core';
import { VgPlayer, VgAPI } from 'videogular2/compiled/core';
import {ActivatedRoute} from '@angular/router'
import * as _ from 'lodash';
declare var VTTCue;

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  
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
  currentItem = "https://wesmedia.wesleyan.edu/covid/";

  //Qualtrics Link
  qualtricsLink = 'https://wesleyan.co1.qualtrics.com/jfe/form/SV_4IKRVKX9VC415Yh?'

  //show Buttons
  showController = true;

  nextButtonShow = false;

  borderColorStart = {'border': '0px solid blue'}
  borderColorEnd = {'border': '0px solid blue'}

  textTrack;
  constructor(private activatedRoute: ActivatedRoute
  ) {
    console.log(this.activatedRoute.snapshot.paramMap.getAll)
  }

  startButtonClicked() {
    console.log( this.textTrack + "track")

    // this.api.seekTime(this.seekTime)this.startPressed = true;
    this.startPressed = true;

    this.borderColorStart['border'] = '5px solid #4caf50';
    // this.startTimeVideo  = this.videos[this.currentIndex].title
    this.startTime = this.api.currentTime
    this.startTimeClicked = true;
    if(this.startTimeClicked == true && this.endTimeClicked == true) {

      this.bothTimeClicked = true
      this.nextButtonShow = true;

    }  

    
  }
endButtonClicked() {
this.endPressed = true;
this.borderColorEnd['border'] = '5px solid #4caf50';

// this.endTimeVideo = this.videos[this.currentIndex].title
this.endTime = this.api.currentTime
this.endTimeClicked = true;
if(this.startTimeClicked == true && this.endTimeClicked == true) {

  this.bothTimeClicked = true
  this.nextButtonShow = true;
}  
}
// addCue(startAt, endAt) {
//   const cue = new VTTCue(startAt, endAt, '');
//   cue.addEventListener('enter', (event) => {
//     // this.onEnterCue(event);
//   });
//   cue.addEventListener('exit', event => {
//     // this.onExitCue(event);
//   });
//   this.textTrack.addCue(cue);
// }
  //Seek to suggested start time
  seekToSuggested(){
    this.api.seekTime(this.suggestedStartTime)
  }

  //Call when the player initially runs
  onPlayerReady(api:VgAPI) {
    this.api = api;
    // this.api.play()
    

 
    // console.log(this.api.canPlay + "can Play")
    // console.log(this.api.duration + "duration is")
    // console.log(this.api.isPlayerReady + "is Player Ready")
    // console.log(this.api.isWaiting + "is Player Waiting")
    // console.log( + "Preessed Play")
    // console.log(this.api.state + "playerState")
    // this.api.play()

    // this.seekToSuggested()
    // this.api.get
    this.api.getDefaultMedia().subscriptions.loadedMetadata.subscribe(
      this.seekToSuggested.bind(this)
     
      // this.playVideo.bind(this)
  );
//   this.api.getDefaultMedia().subscriptions.loadedMetadata.subscribe(
//     this.textTrack = this.api.textTracks[0]
//     // this.playVideo.bind(this)
// );
    // this.api.getMediaById("singleVideo").subscriptions.ended.subscribe(
    //   () => {
    //       // Set the video to the beginning
    //       // this.api.getDefaultMedia().play()
    //       this.api.currentTime = 50
    //       console.log(this.api.currentTime + "Current TIme")
    //       // this.api.getDefaultMedia().currentTime = 20;
    //     });
  }
//   playVideo() {
//     // this.api.play();
//  }

  ngOnInit() {
    this.getInfo();
  }
  nextClicked() {
    // this.showController = false;
    this.qualtricsLink +=   'storystarttime=' + this.startTime 
      + '&storyendtime=' + this.endTime 
    // + '&market=' + this.market + '&text=' + this.textSnippet
    window.open(this.qualtricsLink, "_blank" )
  }

  //Get suggest start time and video from from the URL
  getInfo() {
    this.suggestedStartTime = Number(this.activatedRoute.snapshot.paramMap.get('suggestedStartTime'))

    this.currentItem += this.activatedRoute.snapshot.paramMap.get('video')
   
      
    }

}