import { Routes, RouterModule } from '@angular/router';

import { ParksComponent } from './parks/index';
import { LoginComponent } from './login/index';
import { AuthGuard } from './_guards/index';
import {UsersComponent} from './users/index';
import {EquipmentComponent} from './equipment/index';
import {ParkDetailComponent} from "./park-detail/park-detail.component";

const appRoutes: Routes = [
  { path: '', component: ParksComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'parks', component: ParksComponent, canActivate: [AuthGuard] },
  { path: 'parks/:id', component: ParkDetailComponent },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'equipment', component: EquipmentComponent, canActivate: [AuthGuard] },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
