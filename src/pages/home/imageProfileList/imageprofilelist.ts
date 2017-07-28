import { Component, ViewChild,ChangeDetectorRef } from '@angular/core';
import { NavController, ModalController, ViewController, Nav, FabContainer } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { NativeStorage } from '@ionic-native/native-storage';
import { Camera } from '@ionic-native/camera';
var lastIndex;
@Component({
  selector: 'image-profile',
  templateUrl: 'imageprofile.html'
})
export class ImageProfileList {
public pushPage: any;
public birthdate: Date;
@ViewChild(Nav) nav: Nav;
public mydata: any[];
public drawerOptions: any;
public searchQuery: any;
public searchQuery1: any;
constructor(public navCtrl: NavController, public storage: Storage, public modalCtrl: ModalController, public viewCtrl: ViewController) {
this.LoadData();  
}
  
public LoadData(): any
  {

    this.storage.get('brainvire').then((d) => {
      this.mydata = d;
      console.log(this.mydata);
    }, (e) => {
      console.log('getting err', e);
    })
  }


}
