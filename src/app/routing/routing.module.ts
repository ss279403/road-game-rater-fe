import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MapComponent } from '../map/map.component';
import { RateFormComponent } from '../rate-form/rate-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',  component: MapComponent },
  { path: 'place/edit/:id', component: RateFormComponent },


];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
  })
  export class AppRoutingModule {}