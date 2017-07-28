import { Component, ViewChild } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Nav, Platform } from 'ionic-angular';
import { MapView } from '../pages/map/map';
import { Music } from '../pages/music/music';
import { PageGmapAutocomplete } from '../pages/map/page-gmap-autocomplete/page-gmap-autocomplete';
import { HomePage } from '../pages/home/home';
import { ContactSearch } from '../pages/contact/contact';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;
  @ViewChild(Nav) nav: Nav;
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      setTimeout(() => {
        this.splashScreen.hide();
      }, 100);
    });
  }

  Map() {
    this.nav.setRoot(MapView);

  }


  Music() {
    this.nav.setRoot(Music);

  }

  Contact() {
    this.nav.setRoot(ContactSearch);

  }



}

