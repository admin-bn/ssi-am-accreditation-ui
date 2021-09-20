import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'employee',
    loadChildren: () => import('./features/employee/employee.module').then((m) => m.default),
  },
  {
    path: 'guest',
    loadChildren: () => import('./features/guest/guest.module').then((m) => m.default),
  },
  // {
  //   path: '',
  //   pathMatch: 'full',
  //   redirectTo: 'employee',
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export default class AppRoutingModule {}
