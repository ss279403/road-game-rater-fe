import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { fadeInAnimation } from '../animations/fade-in.animation';

import { DataService } from '../data.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: NgForm;
  @ViewChild('loginForm')
  currentForm: NgForm;

  successMessage: string;
  errorMessage: string;
  userLoggedIn: object;


  userIn: object;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    // this.getUser();
  }

  sendLogin(loginForm: NgForm) {
    this.dataService.userLogin("session/mine", loginForm.value)
      .subscribe(
      userLoggedIn => this.successMessage = "Record added successfully",
      error => this.errorMessage = <any>error);
 //   this.userLoggedIn = {};
   // this.loginForm.form.reset();
    //   this.getUser();
    //   this.ngOnInit();   
  } 


getUser(){
  this.dataService.getRecords("user")
    .subscribe(
    userIn => this.userIn = userIn,
    error => this.errorMessage = <any>error);
  console.log("user info", this.userIn)
}





ngAfterViewChecked() {
  this.formChanged();
}

formChanged() {
  this.loginForm = this.currentForm;
  this.loginForm.valueChanges
    .subscribe(
    data => this.onValueChanged()
    );
}

onValueChanged() {
  let form = this.loginForm.form;

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

