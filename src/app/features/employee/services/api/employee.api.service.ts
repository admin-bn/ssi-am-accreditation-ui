import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import EmployeeApiModel from 'features/employee/models/employee-api.model';
import { Observable } from 'rxjs';
import ConfigInitService from 'src/app/init/config-init.service';

@Injectable({
  providedIn: 'root',
})
export default class EmployeeApiService {
  public httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient, private readonly configServie: ConfigInitService) {}

  public getEmployee(id: string): Observable<EmployeeApiModel> {
    return this.http.get<EmployeeApiModel>(
      `${this.configServie.getConfigStatic().ACCREDITATION_CONTROLLER_BASE_URL}/party/employee/${id}`
    );
  }

  public getEmployees(): Observable<EmployeeApiModel[]> {
    return this.http.get<EmployeeApiModel[]>(
      `${this.configServie.getConfigStatic().ACCREDITATION_CONTROLLER_BASE_URL}/party/employee/`
    );
  }

  public saveEmployee(employeeApiModel: EmployeeApiModel): Observable<EmployeeApiModel> {
    return this.http.post<EmployeeApiModel>(
      `${this.configServie.getConfigStatic().ACCREDITATION_CONTROLLER_BASE_URL}/party/employee/`,
      employeeApiModel,
      this.httpHeader
    );
  }

  public saveEmployeeCSV(formdata: FormData): Observable<any> {
    this.httpHeader.headers.set('Content-Type', 'multipart/form-data');
    return this.http.post<FormData>(
      `${this.configServie.getConfigStatic().ACCREDITATION_CONTROLLER_BASE_URL}/party/employee/csv`,
      formdata,
      {
        headers: this.httpHeader.headers,
        observe: 'events',
        reportProgress: true,
      }
    );
  }
}
