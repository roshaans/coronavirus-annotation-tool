import { Component, OnInit } from '@angular/core';
import { VgPlayer, VgAPI } from 'videogular2/compiled/core';
import {ActivatedRoute} from '@angular/router'
import * as _ from 'lodash';
import {MatExpansionModule} from '@angular/material/expansion';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
declare var VTTCue;

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'], 
  // exports: [MatExpansionModule]

})
export class VideoComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  
  bothTimeClicked = false;

  routeData;
  startPressed = false; 
  endPressed = false;

  startButtonHitCount = 0;
  endButtonHitCount = 0;
  nextButtonHitCount = 0;
  startTimeClicked = false;
  endTimeClicked = false;

  //Keep track of start and end time
  startTime = 0;
  endTime = 0;

  startTimeVideo = "NONE SELECTED";
  endTimeVideo = "NONE SELECTED";


  //For interacting with VGPlayer
  api: VgAPI;

  //Video File to play
  currentItem = "https://wesmedia.wesleyan.edu/covid/";
  //Other info to pass in as URL parameters
  suggestedStartTime = 45;
  marketName;
  station;
  programTitle;
  text;
  hitid;
  coder;

  //Qualtrics Link
  qualtricsLink = 'https://wesleyan.co1.qualtrics.com/SE/?SID=SV_4O3FcMei48IPmXr'

  //show Buttons
  showController = true;

  nextButtonShow = false;

  borderColorStart = {'border': '0px solid blue'}
  borderColorEnd = {'border': '0px solid blue'}

  textTrack;
  constructor(private activatedRoute: ActivatedRoute, private _snackBar: MatSnackBar) {
    console.log(this.activatedRoute.snapshot.paramMap.getAll)
  }

  startButtonClicked() {
    this.startButtonHitCount += 1
    if(this.nextButtonHitCount > 0){
      this.openSnackBar("If you have made any mistakes and are proceeding to remark a clip, please be sure to visit the newly open Qualtrics Video.", this.horizontalPosition)
    }
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
  if(this.nextButtonHitCount > 0){
    this.openSnackBar("If you have made any mistakes and are proceeding to remark a clip, please be sure to visit the newly open Qualtrics Video.", this.horizontalPosition)
  }
  this.endButtonHitCount += 1
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
openSnackBar(text, horizontal) {
  this._snackBar.open(text, 'End now', {
    duration: 4000,
    horizontalPosition: horizontal,
    verticalPosition: this.verticalPosition,
  });
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
    this.openSnackBar("Welcome! The video should begin shortly at the suggested start time. If you have any feedback, please specify below! Thank you :) ", "left")
    this.getInfo();
  }
  nextClicked() {
    this.nextButtonHitCount += 1
    // this.showController = false;
    this.createQualtricsLink()
    // this.qualtricsLink +=   'storystarttime=' + this.startTime 
    //   + '&storyendtime=' + this.endTime 
    // + '&market=' + this.market + '&text=' + this.textSnippet
    window.open(this.qualtricsLink, "_blank" )
  }
  feedbackButtonClicked(){
    window.open("https://siddiquiroshaan.typeform.com/to/B4YaHYw7", "_blank" )

  }

  //Get suggest start time and video from from the URL
  getInfo() {


    this.marketName  = this.activatedRoute.snapshot.paramMap.get('MarketName');
    this.station = this.activatedRoute.snapshot.paramMap.get('station');
    this.programTitle = this.activatedRoute.snapshot.paramMap.get('program_title');
    this.suggestedStartTime = Number(this.activatedRoute.snapshot.paramMap.get('offset'))
    this.text = this.activatedRoute.snapshot.paramMap.get('Text');
    this.currentItem += this.activatedRoute.snapshot.paramMap.get('bcastid')
    this.currentItem += '.mp4'

    this.hitid = this.activatedRoute.snapshot.paramMap.get('hitid');
    this.coder = this.activatedRoute.snapshot.paramMap.get('coder');

      
    }
  createQualtricsLink() {
    this.qualtricsLink += '&coder=' + this.coder + '&&market=' + this.marketName + '&station=' + this.station + '&title=' + this.programTitle + '&bcastid=' + this.currentItem +  '&offset=' + String(this.suggestedStartTime) + '&hitid=' + this.hitid + '&text=' + this.text 
    +'&storystarttime=' + this.startTime + '&storyendtime=' + this.endTime  
  }
}