import { Routes, RouterModule } from '@angular/router';

import { ParksComponent } from './parks/index';
import { LoginComponent } from './login/index';
import { AuthGuard } from './_guards/index';
import {UsersComponent} from './users/index';
import {EquipmentComponent} from './equipment/index';
import {ParkDetailComponent, SuggestedParkDetailComponent} from './park-detail/index';
import {CategoriesComponent} from './categories/index';
import {SurveysComponent} from './surveys/index';
import {StatisticsComponent} from './statistics/index';

const appRoutes: Routes = [
  { path: '', component: ParksComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'parks', component: ParksComponent, canActivate: [AuthGuard] },
  { path: 'parks/:id', component: ParkDetailComponent, canActivate: [AuthGuard] },
  { path: 'suggested_parks/:id', component: SuggestedParkDetailComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'equipment', component: EquipmentComponent, canActivate: [AuthGuard] },
  { path: 'categories', component: CategoriesComponent, canActivate: [AuthGuard] },
  { path: 'surveys', component: SurveysComponent, canActivate: [AuthGuard] },
  { path: 'stat', component: StatisticsComponent, canActivate: [AuthGuard] },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
