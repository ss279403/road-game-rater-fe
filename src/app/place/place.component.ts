import 'rxjs/add/operator/switchMap';
import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { fadeInAnimation } from '../animations/fade-in.animation';


import { DataService } from '../data.service'

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css'],
  animations: [fadeInAnimation]
})


export class PlaceComponent implements OnInit {

  errorMessage: string;
  successMessage: string;
  places: any[];

  constructor(
    private dataService: DataService,
     private route: ActivatedRoute,
     private location: Location
  ) {}

  getPlaces(){
    this.dataService.getRecords("places")
    .subscribe(
      places => this.places = places,
      error =>  this.errorMessage = <any>error);
      console.log(this.places)
    }

  ngOnInit() {
   this.getPlaces();
  }

}
