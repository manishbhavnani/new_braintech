import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NavController, ModalController, ViewController, Nav, FabContainer, Keyboard, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UserAdd } from '../user-add/user-add';
import { Profile } from '../profile/profile';
import { NativeStorage } from '@ionic-native/native-storage';
import { Camera } from '@ionic-native/camera';
import { ImageProfileList } from './imageProfileList/imageprofilelist';


var lastIndex;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public pushPage: any;
  public color="red";
  public birthdate: Date;
  @ViewChild(Nav) nav: Nav;
  public myTracks: any[];
  public drawerOptions: any;
  public searchQuery: any;
  public searchQuery1: any;
  public userCheck = [];
  public data = [];
  public in: any;
  public language: any;
  public age: any;
  public lastImage: any = "download.jpg";
  public lastProfileData;
  constructor(public navCtrl: NavController, private nativeStorage: NativeStorage, public storage: Storage, public modalCtrl: ModalController, public viewCtrl: ViewController, private changeDetectorRef: ChangeDetectorRef, public keyboard: Keyboard,public loading: LoadingController) {
    this.searchQuery = '';
    this.pushPage = UserAdd;
  }


ionViewLoaded() {
  let loader = this.loading.create({
    spinner: 'hide',
    content: 'Getting latest entries...',
  });


  loader.present();

setTimeout(() => {
    loader.dismiss();
  }, 5000);


}


  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      this.loadData();
      refresher.complete();
    }, 2000);
  }

  /**
   * Initalization Of LoadData
   */

 public  loadData(): any {

    this.storage.get('brainvire').then((d) => {
      this.myTracks = d;
      this.data = d;
      console.log(this.myTracks);

      if (this.myTracks != null) {
        this.lastProfileData = this.myTracks.length - 1;
        console.log(this.lastProfileData);
        this.lastImage = this.myTracks[this.myTracks.length - 1].image;
      }

    }, (e) => {
      console.log('getting err', e);
    })
    this.language = false;
  }


 public imageList(): any {
      let profileModal = this.modalCtrl.create(ImageProfileList);
      profileModal.present(); 

  }
  public editProfileModal(i): any {
    this.navCtrl.push(Profile, { userId: i });
  }
  ionViewWillEnter() {
    this.loadData();
  }

  public changeDeleteState(index, active) {
    if (active) {
      this.userCheck.push({
        value: index
      });
    }
    else {
      this.userCheck.splice(this.userCheck.indexOf(index), 1);
    }
    console.log("Total Push" + JSON.stringify(this.userCheck));
  }
  public getItems(searchbar) {
    var q = searchbar.srcElement.value;
    if (!q) {
      return;
    }
    this.data = this.myTracks.filter((v) => {
      if (v.name && q) {

        if ((v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) || (v.language.toLowerCase().indexOf(q.toLowerCase()) > -1) || (v.dob.toLowerCase().indexOf(q.toLowerCase()) > -1)) {
          return true;
        }
        return false;
      }
    });

    console.log(q, this.myTracks.length);

  }




   cancelFab(fab: FabContainer)
  {
      fab.close();
  }
  public getRadio(value): any {
  
    var q = value;
    console.log(q);
    if (!q) {
      return;
    }
    this.data = this.myTracks.filter((v) => {
      if (v.language && q) {

        if ((v.language.toLowerCase().indexOf(q.toLowerCase()) > -1)) {

          return true;
        }
        return false;
      }
    });

    console.log(q, this.myTracks.length);

  }

  public getImageFilter() {
    this.data = this.myTracks.filter((v) => {
      console.log("------------Image" + v.image);
      if (v.image.length > 0) {
        console.log("------------Image" + v.image);
        return true;
      }
      return false;
    });
  }

  public getNames(searchbar) {
  }

  public onCancel(ev) {
    ev.stopPropagation();
  }

  public addUser() {
    this.navCtrl.push(UserAdd);

  }

 public remove() {
  console.log(this.userCheck);
    if (this.userCheck.length >= 1) {
      console.log("Total Push" + JSON.stringify(this.userCheck));
      for (let i of this.userCheck) {
        this.myTracks.splice(i.value, 1);
      }
      this.storage.set('brainvire', this.myTracks);

      this.userCheck = [];

      this.userCheck=[];
    }
  }
}
