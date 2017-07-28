import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
import { NavController, ActionSheetController, ToastController, LoadingController, Loading, Platform, NavParams,ViewController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { FormBuilder, Validators, AbstractControl,NgForm,FormControl, FormGroup } from '@angular/forms';
declare var cordova: any;
@Component({
  selector: 'profile',
  templateUrl: 'profile.html'
})
export class Profile {
  public base64Image: string;
  public captureDataUrl: string;
  public  lastImage: string = "";
  public loading: Loading;
  public items = [];
  public data = [];
  public myDOB: any;
  public homepage: any;
  public name:any;
  public preLanguage: any;
  public cdob: string = "00/00/0000";
  public chname: string = "valid";
  public cplanguage: any = "eng";
  public getIndex: any;
  public something: any;
  public Language: any;
  public language: any;
  public alldata = [];
  public LM:any;
  public userEditForm : FormGroup;
  public username:any;
  public Dbirth:any;
constructor(public navCtrl: NavController, public storage: Storage, private camera: Camera, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController, public file: File, public filePath: FilePath, public params: NavParams,private fb: FormBuilder,public viewCtrl: ViewController) {

  this.homepage = HomePage;
  this.storage.get('brainvire').then((d) => {

    this.alldata = d;
    this.getIndex = this.params.get('userId');
    this.username = d[this.getIndex].name;
    this.Dbirth = d[this.getIndex].dob;
    this.Language = d[this.getIndex].language;
    this.lastImage = d[this.getIndex].image;
    this.LM= d[this.getIndex].image;
    console.log(this.lastImage ! == null,this.lastImage);
  });
}


ngOnInit()
{
  this.userEditForm = this.fb.group({  
            name: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
            myDOB: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
            preLanguage: ['', Validators.compose([Validators.required, Validators.minLength(5)])]           
          }); 
  
        this.name = this.userEditForm.controls['name'];     
        this.myDOB=this.userEditForm.controls['myDOB'];  
        this.preLanguage=this.userEditForm.controls['preLanguage'];  
}


 // Updating User Profile
public save(): any {
this.chname = this.name.value;
this.cdob = this.myDOB.value;
this.cplanguage = this.Language.value; 

if(this.lastImage.length<20){
this.lastImage = this.pathForImage(this.lastImage);
}
if (this.chname != null && this.cdob != null) {
  this.alldata[this.getIndex] = {
    name: this.name.value,
    dob: this.myDOB.value,
    language: this.preLanguage.value,
    image: this.lastImage
  }
  this.storage.set('brainvire', this.alldata);
   this.viewCtrl.dismiss();
}
}
//Present Actionsheet for camera & Gallery Access 
public viewPhotoOption(): any {
let actionSheet = this.actionSheetCtrl.create({
  title: 'Select Image Source',
  buttons: [
    {
      text: 'Gallery',
      handler: () => {
        this.capture(this.camera.PictureSourceType.PHOTOLIBRARY);

      }
    },
    {
      text: 'Use Camera',
      handler: () => {
        this.capture(this.camera.PictureSourceType.CAMERA);
      }
    },
    {
      text: 'Cancel',
      role: 'cancel'
    }
  ]
});
actionSheet.present();
}
  /**
   * Image capture from Gallery & Camera
   * @param sourceType : picture source path for gallery & Camera
   */
  
public capture(sourceType): any {
var options = {
quality: 100,
sourceType: sourceType,
saveToPhotoAlbum: false,
correctOrientation: true
};
this.camera.getPicture(options).then((imagePath) => {
// Handling Android Library
if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
  this.filePath.resolveNativePath(imagePath)
    .then(filePath => {
      let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
      let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
      this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
    });
} else {
  var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
  var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
  this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
}
}, (err) => {
this.presentToast('Error while selecting image.');
});

}
private createFileName(): any  {
  var d = new Date(),
    n = d.getTime(),
    newFileName = n + ".jpg";
  return newFileName;
}

/**
 * 
 * @param namePath : Image path name
 * @param currentName : Current Image Name
 * @param newFileName : New Image Name
 */
private copyFileToLocalDir(namePath, currentName, newFileName): any {
  this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
    this.lastImage = newFileName;
  }, error => {
    this.presentToast('Error while storing file.');
  });
}

/**
 * 
 * @param text : Display Toast Text
 */
private presentToast(text): any {
  let toast = this.toastCtrl.create({
    message: text,
    duration: 3000,
    position: 'top'
  });
  toast.present();
}

  // Always get the accurate path to your apps folder
public pathForImage(img) {
  if (img === null) {
    return '';
  } else {
    return cordova.file.dataDirectory + img;
  }

}

}