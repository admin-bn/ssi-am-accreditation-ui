import { Injectable } from '@angular/core';
import EmployeeApiModel from 'features/employee/models/employee-api.model';
import EmployeeViewModel from 'features/employee/models/employee-view.model';
import { map } from 'rxjs/operators';
import AbstractStore from 'shared/abstractions/store.abstract';
import EmployeeApiService from '../api/employee.api.service';

/**
 * The purpose of this service is to hold the golden source of view data for entity
 * And being a mediator between views and higher level services
 * Handles side effects and data mutations
 * Though does NOT contain any mapping logic itself
 */
@Injectable({
  providedIn: 'root',
})
export default class EmployeeDetailStoreService extends AbstractStore<EmployeeViewModel> {
  constructor(private employeeApiService: EmployeeApiService) {
    super();
  }

  protected buildStore(...args: any): any {
    const id: string = args[0];
    return this.employeeApiService
      .getEmployee(id)
      .pipe(map((apiModel: EmployeeApiModel) => Object.assign(new EmployeeViewModel(), apiModel)));
  }
}
