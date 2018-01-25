import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaceComponent } from '../place/place.component'
import { MapComponent } from '../map/map.component';
import { SingleplaceComponent } from '../singleplace/singleplace.component';
import { RateFormComponent } from '../rate-form/rate-form.component';
import { CreateuserComponent } from '../createuser/createuser.component';
import { LoginComponent } from '../login/login.component';
import { AboutUsComponent } from '../about-us/about-us.component';
import { UserViewComponent } from '../user-view/user-view.component';
import { FeedbackComponent } from '../feedback/feedback.component';

const routes: Routes = [
//  { path: '', redirectTo: '/map', pathMatch: 'full' },
  { path: 'map',  component: MapComponent },
  { path: 'place/add/:id', component: RateFormComponent },
  { path: 'place', component: PlaceComponent },
  { path: 'place/:id', component: SingleplaceComponent },
  { path: 'newUser', component: CreateuserComponent },
  { path: 'login', component: LoginComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'user/:id', component: UserViewComponent },
  { path: 'feedback', component: FeedbackComponent},

];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
  })
  export class AppRoutingModule {}