import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild, Output, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { fadeInAnimation } from '../animations/fade-in.animation';
import * as AWS from 'aws-sdk';
import { Router } from '@angular/router';
import { DataService } from '../data.service'

@Component({
  selector: 'app-rate-form',
  templateUrl: './rate-form.component.html',
  styleUrls: ['./rate-form.component.css'],
  animations: [fadeInAnimation]
})
export class RateFormComponent implements OnInit {


  ratedForm: NgForm;
  @ViewChild('ratedForm')
  currentForm: NgForm;

  successMessage: string;
  errorMessage: string;


  ratedPlace: object;

  places;

  ratingInfo: any[];

  ratingInfoTest: any[];

  placeId;

  imageUrl: string;

  buttonText = "Submit"


  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) { }


  ngOnInit() {
    //   this.getPlaces();
    this.getRatings();
    this.route.params
      .subscribe((params: Params) => {
        (+params['id']) ? this.getRecordForEdit() : null;
        this.placeId = params.id;
      });
  }

  getPlaces() {
    this.dataService.getRecords("places")
      .subscribe(
      places => this.places = places,
      error => this.errorMessage = <any>error);
    console.log(this.places)
  }

  getRatings() {
    this.dataService.getRecords("ratinginfo")
      .subscribe(ratingInfo => {
      this.ratingInfo = ratingInfo
        //   this.getRecordForEdit();
      },
      error => this.errorMessage = <any>error);
    console.log(this.ratingInfo)
  }

  getRatingsbyPlace() {
    this.dataService.getRecords("ratinginfo")
    .subscribe(ratingInfoTest => {
    this.ratingInfoTest = ratingInfoTest
      //   this.getRecordForEdit();
    },
    error => this.errorMessage = <any>error);
  console.log(this.ratingInfo)
  }

  getRecordForEdit() {
    this.route.params
      .switchMap((params: Params) => this.dataService.getRecord("places", +params['id']))
      .subscribe(ratedPlace => {
      this.ratedPlace = ratedPlace
      },
      error => this.errorMessage = <any>error);

  }


  saveRating(ratedForm: NgForm) {
     let ratedPlace = ratedForm.value;
     ratedPlace["itemImage"] = this.imageUrl;
      this.dataService.addRecord("places/" + this.placeId + "/ratinginfo", ratedForm.value)
      .subscribe(
      ratedForm => console.log(this.successMessage = "Record added successfully"),
      error => this.errorMessage = <any>error);
      console.log("rated place", this.ratedPlace)
    
      this.router.navigate(['/place', this.placeId]);
      
  //  this.ngOnInit(); 
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

  imageUpload(image: any) {
    this.buttonText = "Loading...";
    console.log(AWS);
    let imageUpload = image.target.files[0];
    console.log(imageUpload.name);
    console.log(image);

    
    let bucket = new AWS.S3({ params: { Bucket: 'raterphotos' } });
    let params = { Bucket: 'raterphotos', Key: imageUpload.name, Body: imageUpload, ACL: "public-read" };
    bucket.upload(params, (error, res) => {
      this.imageUrl = res["Location"];
      console.log("error: ", error);
      console.log("response: ", res["Location"]);
      this.buttonText = "Submit";
    })
}

clicked() {
  return ('../../assets/images/goldensmall.png')
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
