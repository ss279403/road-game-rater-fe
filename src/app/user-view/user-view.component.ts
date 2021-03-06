import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { fadeInAnimation } from '../animations/fade-in.animation';
import { Router } from '@angular/router';

import { DataService } from '../data.service'

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css'],
  animations: [fadeInAnimation]
})
export class UserViewComponent implements OnInit {

userData: object;
user: object;
errorMessage: string;

  constructor(    
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,) { }

  ngOnInit() {
    this.getUser();
    this.getUserData();
  }

  getUser(){
    this.route.params
      .switchMap((params: Params) => this.dataService.getRecord("user", +params['id']))
      .subscribe(user => this.user = user);
  }

  getUserData() {
    this.dataService.getRecords("user")
      .subscribe(
      userData => this.userData = userData,
      error => this.errorMessage = <any>error);
  }

}
