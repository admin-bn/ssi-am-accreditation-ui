import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import AuthenticationGuard from 'src/app/core/authentication/authentication.guard';
import EmployeeDetailComponent from './views/employee-detail/employee-detail.component';
import EmployeeComponent from './views/employee/employee.component';
import NotificationPageComponent from './views/notification-page/notification-page.component';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'dashboard',
  //   pathMatch: 'full',
  // },
  {
    path: 'dashboard',
    component: EmployeeComponent,
    // canActivate: [AuthenticationGuard],
    // data: { roles: ['hr-admin'] }, // based on permissions model currently only hr-admin should get access to this route
  },
  {
    path: 'detail/:id',
    component: EmployeeDetailComponent,
    // canActivate: [AuthenticationGuard],
    // data: { roles: ['hr-admin', 'employee'] }, // based on permissions model currently only hr-admin and employee should get access to this route
  },
  {
    path: 'creation-status',
    component: NotificationPageComponent,
    // canActivate: [AuthenticationGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export default class EmployeeRoutingModule {}
