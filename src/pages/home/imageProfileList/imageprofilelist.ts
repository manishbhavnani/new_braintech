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
<<<<<<< HEAD
public data: any[];


=======
<<<<<<< HEAD
public data: any[];

=======
>>>>>>> 0e603416b1c3ffe2dcb3e5018d716951268f06c0
>>>>>>> ed8b301362ca194870612b194fb34a150d1922fb
public drawerOptions: any;
public searchQuery: any;
public searchQuery1: any;
constructor(public navCtrl: NavController, public storage: Storage, public modalCtrl: ModalController, public viewCtrl: ViewController) {
<<<<<<< HEAD

  this.searchQuery = '';
  this.LoadData();  

=======
<<<<<<< HEAD
  this.searchQuery = '';
  this.LoadData();  
=======
this.LoadData();  
>>>>>>> 0e603416b1c3ffe2dcb3e5018d716951268f06c0
>>>>>>> ed8b301362ca194870612b194fb34a150d1922fb
}
  
public LoadData(): any
  {

    this.storage.get('brainvire').then((d) => {
<<<<<<< HEAD
      this.data=d;

=======
      this.mydata = d;
<<<<<<< HEAD
      this.data=d;
=======
>>>>>>> 0e603416b1c3ffe2dcb3e5018d716951268f06c0
>>>>>>> ed8b301362ca194870612b194fb34a150d1922fb
      console.log(this.mydata);
    }, (e) => {
      console.log('getting err', e);
    })
  }

<<<<<<< HEAD
=======

<<<<<<< HEAD
>>>>>>> ed8b301362ca194870612b194fb34a150d1922fb
 public getItems(searchbar) {
    var q = searchbar.srcElement.value;
    if (!q) {
      return;
    }
    this.data = this.mydata.filter((v) => {
      if (v.name && q) {

        if ((v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) || (v.language.toLowerCase().indexOf(q.toLowerCase()) > -1) || (v.dob.toLowerCase().indexOf(q.toLowerCase()) > -1)) {
          return true;
        }
        return false;
      }
    });

  }

<<<<<<< HEAD
=======











=======
>>>>>>> 0e603416b1c3ffe2dcb3e5018d716951268f06c0
>>>>>>> ed8b301362ca194870612b194fb34a150d1922fb
}
