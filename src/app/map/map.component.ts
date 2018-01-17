import { Component, OnInit, NgZone, ViewChild, ElementRef, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { DataService } from '../data.service'
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { fadeInAnimation } from '../animations/fade-in.animation';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  animations: [fadeInAnimation]

})
export class MapComponent implements OnInit {

  //userSearch: String;

  lat: number = 37.0902;
  lng: number = -95.7129;
  zoom: number = 17;
  searchControl = new FormControl();

  nearByPlaces: any[];

  places: any[];


  // ratedPlace: object;

  @ViewChild('placesForm')
  placesForm: NgForm;


  @ViewChild("search")
  searchElementRef: ElementRef;

  @ViewChild("myMap")
  mapElementRef: ElementRef;

  successMessage: string;
  errorMessage: string;

  infoWindowId = 0;

  constructor(
    private dataService: DataService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private router: Router,
  ) { }

  ngOnInit() {
    this.setCurrentPosition();
    this.populateMap();
    this.getPlaces();
  }

  private populateMap() {

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["geocode", "establishment"]
      });

      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {

          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          console.log("this place", place);

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();

          //set latitude, longitude and zoom


          var request = {
            location: new google.maps.LatLng(this.lat, this.lng),
            rankBy: google.maps.places.RankBy.DISTANCE,
            types: ["restaurant", "gas_station", "grocery_or_supermarket"]
          };

          let places = new google.maps.places.PlacesService(this.mapElementRef.nativeElement);
          places.nearbySearch(request, (results, status) => {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
              this.nearByPlaces = results;
              console.log("nearby", this.nearByPlaces)
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

        var request = {
          location: new google.maps.LatLng(this.lat, this.lng),
          rankBy: google.maps.places.RankBy.DISTANCE,
          types: ["restaurant", "gas_station", "grocery_or_supermarket"]
        };

        let places = new google.maps.places.PlacesService(this.mapElementRef.nativeElement);
        places.nearbySearch(request, (results, status) => {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            this.nearByPlaces = results;
            console.log("nearby", this.nearByPlaces)
          }
        })
      });
    }
  }


  addPlace(placesForm: NgForm) {
    this.dataService.addRecord("places", placesForm.value)
      .subscribe(
        ratedPlace => {
          this.successMessage = "Record added successfully"
          this.router.navigate(['/place/add', ratedPlace.id])
        },
        error => this.errorMessage = <any>error
      );
  }


  getPlaces() {
    this.dataService.getRecords("places")
      .subscribe(
        places => this.places = places,
        error => this.errorMessage = <any>error
      );
    console.log("places", this.places);
  }

  markerIconUrl() {
    if (this.places)
    return ('../../assets/images/goldensmall.png')
  }

  deunderscore(str: string): string {
    return str.replace(/_/g, ' ');
  }

}
