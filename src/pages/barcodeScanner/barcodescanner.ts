import { Component } from '@angular/core';
import { BarcodeScanner} from '@ionic-native/barcode-scanner';
<<<<<<< HEAD
// import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
=======
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
>>>>>>> ed8b301362ca194870612b194fb34a150d1922fb

@Component({

    selector: 'barcode-scanner',
    templateUrl: 'barcodescanner.html'
})
export class BarcodeScan {

<<<<<<< HEAD
    constructor(public bscan:BarcodeScanner) { }
=======
    constructor(public bscan:BarcodeScanner,private qrScanner: QRScanner) { }
>>>>>>> ed8b301362ca194870612b194fb34a150d1922fb



  click() {
    this.bscan.scan()
      .then((result) => {
        alert(
          "We got a barcode\n" +
          "Result: " + result.text + "\n" +
          "Format: " + result.format + "\n" +
          "Cancelled: " + result.cancelled
        )
      })
      .catch((error) => {
        alert(error);
      })
  }
    


  public qrScann()
  {

<<<<<<< HEAD
// this.qrScanner.prepare()
//   .then((status: QRScannerStatus) => {
//      if (status.authorized) {
//        // camera permission was granted


//        // start scanning
//        let scanSub = this.qrScanner.scan().subscribe((text: string) => {
//          console.log('Scanned something', text);

//          this.qrScanner.hide(); // hide camera preview
//          scanSub.unsubscribe(); // stop scanning
//        });

//        // show camera preview
//        this.qrScanner.show();

//        // wait for user to scan something, then the observable callback will be called

//      } else if (status.denied) {
//        // camera permission was permanently denied
//        // you must use QRScanner.openSettings() method to guide the user to the settings page
//        // then they can grant the permission from there
//      } else {
//        // permission was denied, but not permanently. You can ask for permission again at a later time.
//      }
//   })
//   .catch((e: any) => console.log('Error is', e));

//   }

}
=======
this.qrScanner.prepare()
  .then((status: QRScannerStatus) => {
     if (status.authorized) {
       // camera permission was granted


       // start scanning
       let scanSub = this.qrScanner.scan().subscribe((text: string) => {
         console.log('Scanned something', text);

         this.qrScanner.hide(); // hide camera preview
         scanSub.unsubscribe(); // stop scanning
       });

       // show camera preview
       this.qrScanner.show();

       // wait for user to scan something, then the observable callback will be called

     } else if (status.denied) {
       // camera permission was permanently denied
       // you must use QRScanner.openSettings() method to guide the user to the settings page
       // then they can grant the permission from there
     } else {
       // permission was denied, but not permanently. You can ask for permission again at a later time.
     }
  })
  .catch((e: any) => console.log('Error is', e));

  }

>>>>>>> ed8b301362ca194870612b194fb34a150d1922fb
}