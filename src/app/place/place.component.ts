import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { fadeInAnimation } from '../animations/fade-in.animation';
import { Router } from '@angular/router';

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
  @ViewChild('placesForm')
  placesForm: NgForm;

  user: object;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
  ) { }

  getPlaces() {
    this.dataService.getRecords("places")
      .subscribe(
      places => this.places = places,
      error => this.errorMessage = <any>error);
    console.log(this.places)
  }

  ngOnInit() {
    this.getPlaces();
    this.getUser();
  }

  getUser() {
    this.dataService.seeUser("session/mine")
      .subscribe(
      user => this.user = user,
      error => this.errorMessage = <any>error);
  }


  addPlace(placesForm: NgForm) {
    this.dataService.addRecord("places", placesForm.value)
      .subscribe(
      ratedPlace => {
        this.successMessage = "Record added successfully",
          this.router.navigate(['/place/add', ratedPlace.id]);
      },
      error => this.errorMessage = <any>error);
  }

}
