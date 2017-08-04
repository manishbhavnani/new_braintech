import { Component,Injectable } from '@angular/core';
import { SMS } from '@ionic-native/sms';
import {ToastController  } from 'ionic-angular';
import { FCM } from '@ionic-native/fcm';
import {SocialService} from './socialService';
import { CallNumber } from '@ionic-native/call-number';
declare var FCMPlugin;

@Component({
    selector: 'social',
    templateUrl: 'social.html',
   providers: [SocialService]
})

export class Social  {
    public mobileNumber:any;
    public msg:any;
    
    constructor(public toast:ToastController,public sms:SMS,private fcm: FCM,public service:SocialService,public phone : CallNumber) { 
// FCMPlugin.getToken(
//         (t) => {
//           this.service.postData(t);
//          console.log(t);          
//         },
//         (e) => {
//           console.log(e);
//         }
//       );

//       FCMPlugin.onNotification(
//         (data) => {
//           console.log(data);
//         this.msg=data;
//         },
//         (e) => {
//           console.log(e);
//         }
//       );
  
}

sendTextMessage() {
    this.sms.send(this.mobileNumber, this.msg).then((result) => {
      let successToast = this.toast.create({
        message: "Text message sent successfully! :)",
        duration: 3000
      })
      successToast.present();
    }, (error) => {
      let errorToast = this.toast.create({
        message: "Text message not sent. :(",
        duration: 3000
      })
      errorToast.present();
    });
 }


 public toastMessage(msg)
  {

let Toast = this.toast.create({
        message: msg,
        duration: 3000
      })
      Toast.present();

  }
  


callNumber()
{
 this.phone.callNumber(this.mobileNumber, true)
  .then(() => this.toastMessage("Calling s"))
  .catch(() => this.toastMessage("Not Calling .. Might Be Error ") );

}

  

}