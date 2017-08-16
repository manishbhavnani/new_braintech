import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Profile } from '../pages/profile/profile';
import { UserAdd } from '../pages/user-add/user-add';
import { NativeStorage } from '@ionic-native/native-storage';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import {  ReactiveFormsModule } from '@angular/forms';
//import { FileTransfer} from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { MapView } from '../pages/map/map';
import { PageGmapAutocomplete } from '../pages/map/page-gmap-autocomplete/page-gmap-autocomplete';
import { NearByMap } from '../pages/map/nearbymap';
import { LiveMap } from '../pages/map/livemap';
import { Geolocation } from '@ionic-native/geolocation';
import { Music } from '../pages/music/music';
import { IonicAudioModule, AudioProvider, WebAudioProvider, defaultAudioProviderFactory } from 'ionic-audio';
import { ContactSearch } from '../pages/contact/contact';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { ContactAdd } from '../pages/contact/contactadd';
import { ContactEdit } from '../pages/contact/contactedit';
import { ImageProfileList } from '../pages/home/imageProfileList/imageprofilelist';
import { Network } from '@ionic-native/network';
import { Social } from '../pages/social/social';
import { SMS } from '@ionic-native/sms';
import { FCM } from '@ionic-native/fcm';
import {HttpModule} from '@angular/http';
import { SocialService } from '../pages/social/socialService';
import { AppRate } from '@ionic-native/app-rate';
import { CallNumber } from '@ionic-native/call-number';
import {BarcodeScan} from '../pages/barcodeScanner/barcodescanner';
import { BarcodeScanner} from '@ionic-native/barcode-scanner';
import {List} from '../pages/list/list';
// import { QRScanner } from '@ionic-native/qr-scanner';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    UserAdd,
    Profile,
    MapView,
    PageGmapAutocomplete,
    NearByMap,
    LiveMap,
    Music,
    ContactSearch,
    Social,
    ContactAdd,
    ContactEdit,
    ImageProfileList,
    BarcodeScan,
    ImageProfileList,
    List
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicAudioModule.forRoot(defaultAudioProviderFactory),
    IonicStorageModule.forRoot(),
    ReactiveFormsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    UserAdd,
    Profile,
    Social,
    MapView,
    PageGmapAutocomplete,
    ContactEdit,
    NearByMap,
    LiveMap,
    ContactSearch,
    Music,
    ContactAdd,
    ImageProfileList,
    BarcodeScan,
    ImageProfileList,
    List

  ],
  providers: [
    // QRScanner,
    BarcodeScanner,
    CallNumber,
    AppRate,
    FCM,
    SMS,
    StatusBar,
    SplashScreen,
    UserAdd,
    Camera,
    ContactEdit,
    Contacts,
    Contact,
    Network,
    File,
    FilePath,
    Geolocation,
    NativeStorage,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
