import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import SharedModule from 'shared/shared.module';
import EmployeeRoutingModule from './employee-routing.module';
import EmployeeFormComponent from './forms/employee-form/employee-form.component';
import EmployeeApiService from './services/api/employee.api.service';
import EmployeeDetailStoreService from './services/stores/employee-detail.store.service';
import EmployeeStoreService from './services/stores/employee.store.service';
import EmployeeDetailComponent from './views/employee-detail/employee-detail.component';
import EmployeeComponent from './views/employee/employee.component';
import NotificationPageComponent from './views/notification-page/notification-page.component';

@NgModule({
  declarations: [EmployeeDetailComponent, EmployeeFormComponent, EmployeeComponent, NotificationPageComponent],
  providers: [EmployeeApiService, EmployeeStoreService, EmployeeDetailStoreService],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    SharedModule,
  ],
})
export default class EmployeeModule {}
