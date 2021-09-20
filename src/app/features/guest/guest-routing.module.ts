import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import AuthenticationGuard from '../../core/authentication/authentication.guard';
import GuestAddComponent from './views/guest-add/guest-add.component';
import GuestOverviewComponent from './views/guest-overview/guest-overview.component';
import WelcomeComponent from './views/welcome/welcome.component';
import { GuestAccreditationComponent } from './views/guest-accreditation/guest-accreditation.component';
import { GuestCreationStatusComponent } from './views/guest-creation-status/guest-creation-status.component';

const routes: Routes = [
  {
    path: 'welcome/:id',
    component: WelcomeComponent,
  },
  {
    path: 'accreditation/:id',
    component: GuestAccreditationComponent,
  },
  {
    path: 'dashboard',
    component: GuestOverviewComponent,
    canActivate: [AuthenticationGuard],
    data: { roles: ['employee'] }, // based on permissions model currently only employee should get access to this route
  },
  {
    path: 'add',
    component: GuestAddComponent,
    // canActivate: [AuthenticationGuard],
    // data: { roles: ['employee'] }, // based on permissions model currently only employee should get access to this route
  },
  {
    path: 'creation-status',
    component: GuestCreationStatusComponent,
    // canActivate: [AuthenticationGuard],
    // data: { roles: ['employee'] }, // based on permissions model currently only employee should get access to this route
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export default class GuestRoutingModule {}
