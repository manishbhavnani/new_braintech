import { Component, OnInit ,ViewChild ,ElementRef } from '@angular/core';
import { NavController, ModalController,NavParams  } from 'ionic-angular';
import { MapView  } from '../map';
 import {   HomePage } from '../../home/home';
import { Geolocation ,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation';
declare var google:any;

@Component({
    selector: 'page-page-gmap-autocomplete',
    templateUrl: 'page-gmap-autocomplete.html'
})
export class PageGmapAutocomplete implements OnInit {

    address:any = {
        place: '',
        set: false,
    };

options : GeolocationOptions;
currentPos : Geoposition;
@ViewChild('map') mapElement: ElementRef;
map: any;
public currentLocation;

    placesService:any;
    getDetail:any;
    markers = [];
    placedetails: any;
    lat:any;
    lang:any;
    
    constructor(public navCtrl: NavController,
        public modalCtrl: ModalController,public params: NavParams,private geolocation : Geolocation) { 
    }

ngOnInit() {
this.initMap();
this.initPlacedetails();
this.getDetail=this.params.get('userId');
this.reset();   
this.address.place = this.getDetail.description;
this.getPlaceDetail(this.getDetail.place_id);}


 private reset() {
        this.initPlacedetails();
        this.address.place = '';
        this.address.set = false;
    }

    private getPlaceDetail(place_id:string):void {
        var self = this;
        var request = {
            placeId: place_id
        };
        this.placesService = new google.maps.places.PlacesService(this.map);
        this.placesService.getDetails(request, callback);
        function callback(place, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                console.log('page > getPlaceDetail > place > ', place);
                // set full address
                self.placedetails.address = place.formatted_address;
                self.placedetails.lat = place.geometry.location.lat();
                console.log("----Place Geo---"+place.geometry.location.lat());

              

                self.placedetails.lng = place.geometry.location.lng();
                for (var i = 0; i < place.address_components.length; i++) {
                    let addressType = place.address_components[i].types[0];
                    let values = {
                        short_name: place.address_components[i]['short_name'],
                        long_name: place.address_components[i]['long_name']
                    }
                    if(self.placedetails.components[addressType]) {
                        self.placedetails.components[addressType].set = true;
                        self.placedetails.components[addressType].short = place.address_components[i]['short_name'];
                        self.placedetails.components[addressType].long = place.address_components[i]['long_name'];
                    }                                     
                }                  
              
                self.map.setCenter(place.geometry.location);
                self.createMapMarker(place);
              
                self.address.set = true;
                console.log('page > getPlaceDetail > details > ', self.placedetails);
            }else{
                console.log('page > getPlaceDetail > status > ', status);
            }
        }
    }

    private initMap() {
        var point = {lat: 20.5936840, lng: 78.9628800}; 
        let divMap = (<HTMLInputElement>document.getElementById('map'));
        this.map = new google.maps.Map(divMap, {
            center: point,
            zoom: 15,
            disableDefaultUI: true,
            draggable: false,
            zoomControl: true
        });
    }

    private createMapMarker(place:any):void {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: this.map,
          position: placeLoc
        });    
        this.markers.push(marker);
    }

    private initPlacedetails() {
        this.placedetails = {
            address: '',
            lat: '',
            lng: '',
            components: {
                route: { set: false, short:'', long:'' },                           
                street_number: { set: false, short:'', long:'' },                   
                sublocality_level_1: { set: false, short:'', long:'' },             
                locality: { set: false, short:'', long:'' },                        
                administrative_area_level_2: { set: false, short:'', long:'' },    
                administrative_area_level_1: { set: false, short:'', long:'' },    
                country: { set: false, short:'', long:'' },                       
                postal_code: { set: false, short:'', long:'' },                    
                postal_code_suffix: { set: false, short:'', long:'' },             
            }    
        };        
    }









//Map-----------------


getUserPosition(){
        this.options = {
        enableHighAccuracy : false
                    };
    this.geolocation.getCurrentPosition(this.options).then((pos : Geoposition) => {
        this.currentPos = pos;     
        console.log(pos);
        this.addMap(pos.coords.latitude,pos.coords.longitude);

    },(err : PositionError)=>{
        console.log("error : " + err.message);
    ;
    })
    }
    ionViewDidEnter(){
    this.getUserPosition();}   

    addMap(lat,long){
        console.log("Place Details "+  JSON.stringify(this.placedetails));

        let l=JSON.stringify(this.placedetails.lat);
        let lg=JSON.stringify(this.placedetails.lng);
      


        let latLng = new google.maps.LatLng(l, lg);
        this.currentLocation=latLng ;
        let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.addMarker();

}


    addMarker(){
    let marker = new google.maps.Marker({
    map: this.map,
    animation: google.maps.Animation.DROP,
    position: this.map.getCenter()
    });

    let content = "<p>This is your current position !</p>";          
    let infoWindow = new google.maps.InfoWindow({
    content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
    infoWindow.open(this.map, marker);
    });

}





gotohome()
    {

 
 this.navCtrl.push( HomePage );
    }













}