import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
//import { ActivatedRoute, Params } from '@angular/router';
// import { Location } from '@angular/common';

import { DataService } from '../data.service'
@Component({
  selector: 'app-rate-form',
  templateUrl: './rate-form.component.html',
  styleUrls: ['./rate-form.component.css']
})
export class RateFormComponent implements OnInit {

  lat: number;
  lng: number;

  ratedForm: NgForm;
  @ViewChild('ratedForm')
  currentForm: NgForm;

  successMessage: string;
  errorMessage: string; 

  ratedPlace: object;
  
  
  constructor(
    private dataService: DataService,
  //  private route: ActivatedRoute,
    // private location: Location
  ) {}


  ngOnInit() {
  this.getUserLocation();
    // this.route.params
    // .subscribe((params: Params) => {
    //   (+params['id']) ? this.getRecordForEdit() : null;
    // });
  }

  private getUserLocation() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    }
  }

  // getRecordForEdit(){
  //   this.route.params
  //     .switchMap((params: Params) => this.dataService.getRecord("ratingInfo", +params['id']))
  //     .subscribe(ratedPlace => this.ratedPlace = ratedPlace);
  // }

  saveRating(ratedForm: NgForm){
    console.log(ratedForm.value);
    // if(typeof ratedForm.value.id === "number"){
    //   this.dataService.editRecord("ratingInfo", ratedForm.value, ratedForm.value.id)
    //       .subscribe(
    //         ratedPlace => this.successMessage = "Record updated successfully",
    //         error =>  this.errorMessage = <any>error);
    // }else{
      this.dataService.addRecord("ratinginfo", ratedForm.value)
          .subscribe(
            ratedPlace => this.successMessage = "Record added successfully",
            error =>  this.errorMessage = <any>error); 
            this.ratedPlace = {};
            this.ratedForm.form.markAsPristine();
          // }

  }

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    this.ratedForm = this.currentForm;
    this.ratedForm.valueChanges
      .subscribe(
        data => this.onValueChanged()
      );
  }

  onValueChanged() {
    let form = this.ratedForm.form;

    for (let field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  formErrors = {
    'rating': '',
    'isClean': '',
    'isHandicap': '',
    'isFamily': '',
    'comments': ''
  };

  validationMessages = {
    'rating': {
      'required': 'Movie title is required.',
      'minlength': 'Movie title must be at least 2 characters long.',
      'maxlength': 'Movie title cannot be more than 30 characters long.'
    },
    'isClean': {
      'required': 'Distributor is required.',
      'minlength': 'Distributor must be at least 2 characters long.',
      'maxlength': 'Distributor cannot be more than 30 characters long.'
    },
    'isHandicap': {
      'pattern': 'budget must be a number'
    },
    'isFamily': {
      'pattern': 'Release date should be in the following format: YYYY-MM-DD'
    },
    'comments': {
      'pattern': 'Release date should be in the following format: YYYY-MM-DD'
    }

  };




} 
