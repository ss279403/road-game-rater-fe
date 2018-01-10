import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataService } from './data.service';
import { AgmCoreModule } from '@agm/core';
// import { RouterModule }   from '@angular/router';
//import { MatDialogModule } from '@angular/material';
import { HttpModule } from '@angular/http';
//import { AppRoutingModule } from './routing/routing.module';
import { MapComponent } from './map/map.component';
//import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent ],
  imports: [
    BrowserModule,
  //  AppRoutingModule,
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
  providers: [DataService],

  bootstrap: [ AppComponent ]
})

export class AppModule {}