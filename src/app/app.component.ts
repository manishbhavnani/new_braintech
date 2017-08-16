import { Component, ViewChild } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Nav, Platform } from 'ionic-angular';
import { MapView } from '../pages/map/map';
import { Music } from '../pages/music/music';
import { PageGmapAutocomplete } from '../pages/map/page-gmap-autocomplete/page-gmap-autocomplete';
import { HomePage } from '../pages/home/home';
import { ContactSearch } from '../pages/contact/contact';
import { Social } from '../pages/social/social';
import { AppRate } from '@ionic-native/app-rate';
import {BarcodeScan} from '../pages/barcodeScanner/barcodescanner';
<<<<<<< HEAD
import {List} from '../pages/list/list';
=======
>>>>>>> ed8b301362ca194870612b194fb34a150d1922fb

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any =HomePage;
  @ViewChild(Nav) nav: Nav;
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,private appRate: AppRate) {
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

  API()
  {
    this.nav.setRoot(List);

  }


  Music() {
    this.nav.setRoot(Music);

  }

  Contact() {
    this.nav.setRoot(ContactSearch);

  }


Social(){

    this.nav.setRoot(Social);
}


Rate(){

  // App Preference Store Url
// this.appRate.preferences.storeAppURL = {
//   ios: '<app_id>',
//   android: 'market://details?id=<package_name>',
//   windows: 'ms-windows-store://review/?ProductId=<store_id>'
// };

this.appRate.promptForRating(true);

 // Remind Me latter App Preference Store Code
// or, override the whole preferences object
// this.appRate.preferences = {
//   usesUntilPrompt: 3,
//   storeAppURL: {
//    ios: '<app_id>',
//    android: 'market://details?id=<package_name>',
//    windows: 'ms-windows-store://review/?ProductId=<store_id>'
//   }
// }; 

// this.appRate.promptForRating(false);

}


public Barcode()
  {
this.nav.setRoot(BarcodeScan);
  }


}

