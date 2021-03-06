import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataService } from './data.service';
import { AgmCoreModule } from '@agm/core';
import { RouterModule }   from '@angular/router';
//import { MatDialogModule } from '@angular/material';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './routing/routing.module';
import { MapComponent } from './map/map.component';
import { RateFormComponent } from './rate-form/rate-form.component';
import { PlaceComponent } from './place/place.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FilterPipe }from './filter.pipe';
import { SortPipe } from './sort.pipe'
import { SingleplaceComponent } from './singleplace/singleplace.component';
import { RatingModule } from 'ngx-bootstrap/rating';
import { CreateuserComponent } from './createuser/createuser.component';
import { LoginComponent } from './login/login.component';
import { StatusMessageComponent } from './status-message/status-message.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { UserViewComponent } from './user-view/user-view.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { FooterComponent } from './footer/footer.component';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
// import { AngularFireAuthModule } from 'angularfire2/auth';
import { UploadService } from './uploads/upload.service';
import { Upload } from './uploads/upload';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    FilterPipe,
    SortPipe,
    MapComponent,
    RateFormComponent,
    PlaceComponent,
    NavigationComponent,
    SingleplaceComponent,
    CreateuserComponent,
    LoginComponent,
    StatusMessageComponent,
    AboutUsComponent,
    UserViewComponent,
    FeedbackComponent,
    FooterComponent ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule, // for database
 // AngularFireAuthModule,
    BrowserModule,
    RatingModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpModule,
  //  MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
      AgmCoreModule.forRoot({
      //  apiKey: "AIzaSyAdnWstnGpjYaJZIfWabH0woBiZnZJEHig",
      apiKey: "AIzaSyCIGoNBEP7o7It5pNj2RHtSz0B6_uf9P_U",
      libraries: ["places"]
      }),
    ],
  providers: [DataService, UploadService],

  bootstrap: [ AppComponent ]
})

export class AppModule {}
