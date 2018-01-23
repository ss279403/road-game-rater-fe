import { Component, OnInit } from '@angular/core';

import { fadeInAnimation } from '../animations/fade-in.animation';





@Component({

  selector: 'app-feedback',

  templateUrl: './feedback.component.html',

  styleUrls: ['./feedback.component.css'],

  animations: [fadeInAnimation]

})

export class FeedbackComponent implements OnInit {



  comments;



  constructor() { }



  ngOnInit() {

  }



  openUserMailClient() {

    let linkForEmail: string = `mailto:raterroadgame@gmail.com&subject=Feedback&body=Hello%0D%0D${this.comments}.%0D%0DThanks`

    window.location.href = linkForEmail;

  }





}