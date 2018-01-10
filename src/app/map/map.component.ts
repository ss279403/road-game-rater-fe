import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { DataService } from '../data.service'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  userSearch: String;

  lat: number = 37.0902;
  lng: number = -95.7129;
  zoom: number = 18;
  searchControl = new FormControl();
  nearByPlaces;

  placesForm: NgForm;
  @ViewChild('placesForm')


  @ViewChild("search")
  searchElementRef: ElementRef;

  @ViewChild("myMap")
  mapElementRef: ElementRef;

  successMessage: string;
  errorMessage: string; 


  constructor(
    private dataService: DataService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    this.setCurrentPosition();
    this.populateMap();
  }

  private populateMap(){
    
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
     
           let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
             types: ["geocode", "establishment"]
           });
     
           autocomplete.addListener("place_changed", () => {
             this.ngZone.run(() => {

               //get the place result
               let place: google.maps.places.PlaceResult = autocomplete.getPlace();

               console.log(place);
     
               //verify result
               if (place.geometry === undefined || place.geometry === null) {
                 return;
               }

               this.lat = place.geometry.location.lat();
               this.lng = place.geometry.location.lng();
     
               //set latitude, longitude and zoom
               
     
               var request = {
                 location: new google.maps.LatLng(this.lat,this.lng),
                 rankBy: google.maps.places.RankBy.DISTANCE,
                 types: ["restaurant", "gas_station", "grocery_or_supermarket"]
               };
     
               let places = new google.maps.places.PlacesService(this.mapElementRef.nativeElement);
               places.nearbySearch(request, (results, status) => {
                 if (status == google.maps.places.PlacesServiceStatus.OK) {
                   this.nearByPlaces = results;
                   console.log(this.nearByPlaces)
                 }
               })
     
             });
           });
         });
 }

 private setCurrentPosition() {
   if ("geolocation" in navigator) {
     navigator.geolocation.getCurrentPosition((position) => {
       this.lat = position.coords.latitude;
       this.lng = position.coords.longitude;
       
     });
   }
}
addPlace(placesForm: NgForm) {
  console.log(placesForm.value);
  this.dataService.addRecord("places", placesForm.value)
  .subscribe(
    ratedPlace => this.successMessage = "Record added successfully",
    error =>  this.errorMessage = <any>error); 
   
    
}

}
