import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild, Output, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { fadeInAnimation } from '../animations/fade-in.animation';
// import * as AWS from 'aws-sdk';
import { Router } from '@angular/router';
import { DataService } from '../data.service'
import { UploadService } from '../uploads/upload.service';
import { Upload } from '../uploads/upload';

@Component({
  selector: 'app-rate-form',
  templateUrl: './rate-form.component.html',
  styleUrls: ['./rate-form.component.css'],
  animations: [fadeInAnimation]
})
export class RateFormComponent implements OnInit {

  selectedFiles: FileList;
  currentUpload: Upload;

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

  user: any[];


  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private upSvc: UploadService
  ) { }


  ngOnInit() {
    //   this.getPlaces();
    this.getUser();
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
  }

  getRatings() {
    this.dataService.getRecords("ratinginfo")
      .subscribe(ratingInfo => {
      this.ratingInfo = ratingInfo
        //   this.getRecordForEdit();
      },
      error => this.errorMessage = <any>error);
  }

  getUser() {
    this.dataService.getRecords("user")
      .subscribe(
      user => this.user = user,
      error => this.errorMessage = <any>error);
  }


  getRatingsbyPlace() {
    this.dataService.getRecords("ratinginfo")
    .subscribe(ratingInfoTest => {
    this.ratingInfoTest = ratingInfoTest
      //   this.getRecordForEdit();
    },
    error => this.errorMessage = <any>error);
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
      this.dataService.addRecord("places/" + this.placeId + "/ratinginfo", ratedForm.value)
      .subscribe(
      ratedForm => {
        this.successMessage = "Record added successfully"
        window.location.replace('/place/' + this.placeId);
      },
      error => this.errorMessage = <any>error); 
  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
    this.uploadSingle();
  }
  
  
  uploadSingle() {
    let file = this.selectedFiles.item(0)
    this.currentUpload = new Upload(file);
    this.upSvc.pushUpload(this.currentUpload)  
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
