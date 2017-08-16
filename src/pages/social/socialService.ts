import { Injectable } from '@angular/core';
import { Http,Headers} from '@angular/http';
import 'rxjs/Rx';
@Injectable()
export class SocialService  {
    
    
    constructor(public http:Http ) { }

 createAuthorizationHeader(headers:Headers) {
    headers.append('Authorization', 'key=AIzaSyBqpz9mToOcaG3sNzS2udnHb-kUrF3wxWA'); 
  }



postData(data:any)
  {

   var headers = new Headers();
    this.createAuthorizationHeader(headers);
    headers.append('Content-Type', 'application/json');

return this.http.post(
      'https://fcm.googleapis.com/fcm/send',data, {
        headers: headers
      }).map(res => res.json()).subscribe(
        data => { console.log(data); },
        err => { console.log(err); }
      );


  }
    
}