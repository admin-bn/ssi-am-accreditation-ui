/* eslint-disable no-restricted-globals */
import { Component, OnInit } from '@angular/core';
import { UpdateAvailableEvent } from '@angular/service-worker';
import EmployeeFormModel from 'features/employee/models/employee-form.model';
import EmployeeViewModel from 'features/employee/models/employee-view.model';
import EmployeeStoreService from 'features/employee/services/stores/employee.store.service';
import { Observable } from 'rxjs';
import NgswService from 'shared/services/ngsw.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export default class EmployeeComponent implements OnInit {
  viewData$!: Observable<EmployeeViewModel[]>;

  public constructor(private readonly store: EmployeeStoreService, private readonly ngswService: NgswService) {}

  ngOnInit(): void {
    this.init();
    this.subscribe();
    this.handleAppUpdates();
  }

  handleEmployeeCreation(employeeFormModel: EmployeeFormModel): void {
    this.store.handleEmployeeCreation(employeeFormModel);
  }

  private subscribe(): void {
    this.viewData$ = this.store.connect();
  }

  private init(): void {
    this.store.init();
  }

  /**
   * @todo extend handling of service workers SwUpdate events in BKAACMGT-171
   */
  private handleAppUpdates(): void {
    if (this.ngswService.isEnabled()) {
      this.ngswService.isUpdateAvailable().subscribe((event: UpdateAvailableEvent) => {
        if (event.available) {
          // prompt user to update
          console.log('Current version is', event.current);
          // available version
          console.log('Available version is', event.available);

          if (confirm('Do you want to update?')) {
            this.ngswService.activateUpdate().then(() => document.location.reload());
          }
        }
      });
    }
  }

  fetchEmployees(): void {
    this.store.fetchEmployees();
  }

  onCSVUpload(formData: FormData): void {
    this.store.handleCSVUpload(formData);
  }
}
