import { Component } from '@angular/core';
import { Router } from '@angular/router';
import EmployeeViewModel from 'features/employee/models/employee-view.model';

@Component({
  selector: 'app-notification-page',
  templateUrl: './notification-page.component.html',
  styleUrls: ['./notification-page.component.scss'],
})
export default class NotificationPageComponent {
  public success: boolean = false;

  public employees: Array<EmployeeViewModel> = [
    { firstName: 'Holger', lastName: 'Strasse', email: 'holger@mycompany.com' },
  ];

  private readonly successHeader: string = 'Employee Credentials Added';

  private readonly successText: string = `You have successfully added employee credentials for the below employee’s. They will receive an email with a QR code allowing them to add their credentials to their wallets`;

  private readonly errorHeader: string = 'Employee Credentials Unsuccessfull';

  private readonly errorText: string = `The system was unable to create employee credentials for the uploaded csv file. \n 
    Please correct below errors and reupload the file.`;

  public constructor(public router: Router) {
    this.success = this.router.getCurrentNavigation()!.extras.state?.success;
  }

  public getHeaderText(): string {
    return this.success ? this.successHeader : this.errorHeader;
  }

  public getStatusText(): string {
    return this.success ? this.successText : this.errorText;
  }
}
