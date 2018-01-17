import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { fadeInAnimation } from '../animations/fade-in.animation';

import { DataService } from '../data.service'

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent implements OnInit {

  signUpForm: NgForm;
  @ViewChild('signUpForm')
  currentForm: NgForm;

  successMessage: string;
  errorMessage: string;


  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
  }

  saveUser(signUpForm: NgForm) {
    this.dataService.addRecord("user/create", signUpForm.value)
      .subscribe(
      signUpForm => this.successMessage = "Record added successfully",
      error => this.errorMessage = <any>error);
      console.log("rated place", this.signUpForm)
    this.signUpForm.form.reset();
    this.ngOnInit(); 
  }

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    this.signUpForm = this.currentForm;
    this.signUpForm.valueChanges
      .subscribe(
      data => this.onValueChanged()
      );
  }

  onValueChanged() {
    let form = this.signUpForm.form;

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
