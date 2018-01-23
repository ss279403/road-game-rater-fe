import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { fadeInAnimation } from '../animations/fade-in.animation';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  animations: [fadeInAnimation]
})
export class NavigationComponent implements OnInit {

  loginForm: NgForm;
  @ViewChild('loginForm')
  currentForm: NgForm;

  successMessage: string;
  errorMessage: string;

  userLoggedIn: object;

  userIn: object;
  user: object;
 

  constructor(private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router) { }

  ngOnInit() {
    this.getUserIn();
    this.getUser();
  }

  getUserIn() {
    this.dataService.getRecords("user")
      .subscribe(
      userIn => this.userIn = userIn,
      error => this.errorMessage = <any>error);
  }

  signOut() {
       this.dataService.logOff("session/mine")
          .subscribe(
          userIn => {
          this.userIn = userIn
          this.refresh();
          },
          error => this.errorMessage = <any>error
        );
      }
 

  getUser() {
    this.dataService.seeUser("session/mine")
      .subscribe(
      user => this.user = user,
      error => this.errorMessage = <any>error);
  }

  sendLogin(loginForm: NgForm) {

          this.dataService.userLogin("session/mine", loginForm.value)
            .subscribe(
            userLoggedIn => {
            this.successMessage = "Record added successfully"
            this.refresh();
            },
            error => alert("Sorry, Username or Password do not match our records")
          );          
        }

 

  refresh() {
    window.location.reload();
  }

  // ngAfterViewChecked() {
  //   this.formChanged();
  // }

  // formChanged() {
  //   this.loginForm = this.currentForm;
  //   this.loginForm.valueChanges
  //     .subscribe(
  //     data => this.onValueChanged()
  //     );
  // }

  // onValueChanged() {
  //   let form = this.loginForm.form;

  //   for (let field in this.formErrors) {
  //     // clear previous error message (if any)
  //     this.formErrors[field] = '';
  //     const control = form.get(field);

  //     if (control && control.dirty && !control.valid) {
  //       const messages = this.validationMessages[field];
  //       for (const key in control.errors) {
  //         this.formErrors[field] += messages[key] + ' ';
  //       }
  //     }
  //   }
  // }

  // formErrors = {
  //   'rating': '',
  //   'isClean': '',
  //   'isHandicap': '',
  //   'isFamily': '',
  //   'comments': ''
  // };

  // validationMessages = {
  //   'rating': {
  //     'required': 'Movie title is required.',
  //     'minlength': 'Movie title must be at least 2 characters long.',
  //     'maxlength': 'Movie title cannot be more than 30 characters long.'
  //   },
  //   'isClean': {
  //     'required': 'Distributor is required.',
  //     'minlength': 'Distributor must be at least 2 characters long.',
  //     'maxlength': 'Distributor cannot be more than 30 characters long.'
  //   },
  //   'isHandicap': {
  //     'pattern': 'budget must be a number'
  //   },
  //   'isFamily': {
  //     'pattern': 'Release date should be in the following format: YYYY-MM-DD'
  //   },
  //   'comments': {
  //     'pattern': 'Release date should be in the following format: YYYY-MM-DD'
  //   }

  // };

}
