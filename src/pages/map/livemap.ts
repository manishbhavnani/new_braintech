import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { Geolocation, GeolocationOptions, Geoposition, PositionError } from '@ionic-native/geolocation';
declare var google: any;
@Component({
    selector: 'livemap',
    templateUrl: 'livemap.html'
})
export class LiveMap {

public options: GeolocationOptions;
public currentPos: Geoposition;
@ViewChild('map') mapElement: ElementRef;
public map: any;
public currentLocation;
public subscription: any;
constructor(public navCtrl: NavController, private geolocation: Geolocation, public viewCtrl: ViewController) { }

//Get User Position
public  getUserPosition(): any {
        this.options = {
            enableHighAccuracy: false
        };
        this.subscription = this.geolocation.watchPosition().subscribe(position => {
            if ((position as Geoposition).coords != undefined) {
                var geoposition = (position as Geoposition);
                this.addMap(geoposition.coords.latitude, geoposition.coords.longitude);
                console.log('Latitude: ' + geoposition.coords.latitude + ' - Longitude: ' + geoposition.coords.longitude);
            }
        });

    }
    ionViewDidEnter() {
        this.getUserPosition();
    }
//Add Map
public addMap(lat, long): any {
    let latLng = new google.maps.LatLng(lat, long);
    this.currentLocation = latLng;
    let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.addMarker();
}
//Add Live Map Marker
 public addMarker(): any  {
        let marker = new google.maps.Marker({
            map: this.map,
            position: this.map.getCenter(),
            icon: 'map.png'
        });

        let content = "<p>This is your current position !</p>";
        let infoWindow = new google.maps.InfoWindow({
            content: content
        });

        google.maps.event.addListener(marker, 'click', () => {
            infoWindow.open(this.map, marker);
        });

    }

}