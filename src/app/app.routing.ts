import { Routes, RouterModule } from '@angular/router';

import { ParksComponent } from './parks/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { AuthGuard } from './_guards/index';
import {UsersComponent} from './users/index';
import {EquipmentComponent} from './equipment/index';

const appRoutes: Routes = [
  { path: '', component: ParksComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'parks', component: ParksComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'equipment', component: EquipmentComponent, canActivate: [AuthGuard] },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
