import { Component, Provider } from '@angular/core';
import { Platform, Nav, MenuController, NavController } from 'ionic-angular';
import { AudioProvider } from 'ionic-audio';
import { HomePage } from '../home/home';
@Component({
  templateUrl: 'music.html'
})
export class Music {
  myTracks: any[];
  singleTrack: any;
  allTracks: any[];
  selectedTrack: number;
  constructor(private _audioProvider: AudioProvider, public navCtrl: NavController) {
    // plugin won't preload data by default, unless preload property is defined within json object - defaults to 'none'
    this.myTracks = [{
      src: '/android_asset/www/music/m1.mp3',
      artist: 'Music 1',
      title: ' Brainvire 1',
      art: '',
      preload: 'metadata'
    },
    {
      src: '/android_asset/www/music/m2.mp3',
      artist: 'Music 2',
      title: 'Brainvire 2',
      art: '',
      preload: 'metadata'
    },
    {
      src: '/android_asset/www/music/m3.mp3',
      artist: 'Music 3',
      title: 'Brainvire 3',
      art: '',
      preload: 'metadata' 
    },
    {
      src: '/android_asset/www/music/m4.mp3',
      artist: 'Music 4',
      title: 'Brainvire 4',
      art: '',
      preload: 'metadata' 
    }];
  }


  ngAfterContentInit() {
// get all tracks managed by AudioProvider so we can control playback via the API
    this.allTracks = this._audioProvider.tracks;
  }
// use AudioProvider to control selected track      
public  playSelectedTrack(): any {
    this._audioProvider.play(this.selectedTrack);
  }
// use AudioProvider to control selected track    
  public pauseSelectedTrack() {
     this._audioProvider.pause(this.selectedTrack);
  }
//     
  public onTrackFinished(track: any): any {
    console.log('Track finished', track)
  }

/**
 * Music Search
 * @param searchbar : Search Text 
 */
public searchMusic(searchbar): any {
  var q = searchbar.srcElement.value;
  if (!q) {
    return;
  }
  this.myTracks = this.myTracks.filter((v) => {
    if (v.artist && q) {
       if ((v.artist.toLowerCase().indexOf(q.toLowerCase()) > -1) || (v.title.toLowerCase().indexOf(q.toLowerCase()) > -1)) {
        return true;
      }
      return false;
    }
  });
}

public gotohome(): any {
this.navCtrl.setRoot(HomePage);
}

}