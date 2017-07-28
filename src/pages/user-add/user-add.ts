import { Component,Inject } from '@angular/core';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
import { NavController, ActionSheetController, ToastController, LoadingController, Loading, Platform, ViewController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { FormBuilder, Validators, AbstractControl,NgForm,FormControl, FormGroup } from '@angular/forms';

declare var cordova: any;
@Component({
selector: 'user-add',
templateUrl: 'user-add.html'
})
export class UserAdd {
public base64Image: string;
public captureDataUrl: string;
public lastImage: string = null;
public loading: Loading;
public items = [];
public data = [];
public myDOB: any;
public cdob: any = "00/00/0000";
public name: any;
public chname: any = "valid";
public cplanguage: any = "eng";
public preLanguage: any;
public homepage: any;
public something: any;
public userForm : FormGroup;

constructor(public navCtrl: NavController, public storage: Storage, private camera: Camera, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController, public file: File, public filePath: FilePath, public viewCtrl: ViewController,private fb: FormBuilder) {

this.storage.get('brainvire').then((d) => {
  console.log('getting native storage data', d);
  this.data = d;
});
this.homepage = HomePage;
}


ngOnInit()
{
  this.userForm = this.fb.group({  
            name: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
            myDOB: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
            preLanguage: ['', Validators.compose([Validators.required, Validators.minLength(5)])]           
          }); 
  
        this.name = this.userForm.controls['name'];     
        this.myDOB=this.userForm.controls['myDOB'];  
        this.preLanguage=this.userForm.controls['preLanguage'];  
      
}






/**
 * Saving user in local Storage
 */

public save() : any {



if ( this.userForm.valid==true)
  {
  var mypath = this.pathForImage(this.lastImage);
  console.log(mypath);

  if (this.data == null) {
    this.items.push({
      name: this.name.value,
      dob: this.myDOB.value,
      language: this.preLanguage.value,
      image: mypath
    });

    this.storage.set('brainvire', this.items);
    this.viewCtrl.dismiss();
  }
  else {
    this.items.push({
      name: this.name.value,
      dob: this.myDOB.value,
      language: this.preLanguage.value,
      image: mypath
    });
    this.data = this.data.concat(this.items);
    this.storage.set('brainvire', this.data);
    this.viewCtrl.dismiss();
  }
}

}


/**
 * Present Action Sheet for Choosing Image from gallery & camera
 */
public viewPhotoOption() : any {
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
public capture(sourceType) : any {
var options = {
  quality: 100,
  sourceType: sourceType,
  saveToPhotoAlbum: false,
  correctOrientation: true
};

this.camera.getPicture(options).then((imagePath) => {
  // Special handling for Android library
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
/**
 * Create Automatic imagefile name using current date & time
 */
private createFileName() : any {
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
private copyFileToLocalDir(namePath, currentName, newFileName) : any {
  this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
    this.lastImage = newFileName;
  }, error => {
    this.presentToast('Error while storing file.');
  });
}

/**
 * 
 * @param text : Toast text name for displaying
 */

private presentToast(text) : any  {
let toast = this.toastCtrl.create({
  message: text,
  duration: 3000,
  position: 'top'
});
toast.present();
}


/**
 * 
 * @param img : Geting Path for Image in Base64Format
 */
public pathForImage(img):any {
  if (img === null) {
    return '';
  } else {
    return cordova.file.dataDirectory + img;
  }

}

}