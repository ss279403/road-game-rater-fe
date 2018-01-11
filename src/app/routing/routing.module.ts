import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaceComponent } from '../place/place.component'
import { MapComponent } from '../map/map.component';
import { RateFormComponent } from '../rate-form/rate-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/map', pathMatch: 'full' },
  { path: 'map',  component: MapComponent },
  { path: 'place/add/:id', component: RateFormComponent },
  { path: 'place', component: PlaceComponent },


];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
  })
  export class AppRoutingModule {}