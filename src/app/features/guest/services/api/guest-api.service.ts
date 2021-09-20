import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import GuestAccreditionModel from 'features/guest/models/guest-accreditation.model';
import GuestExtendedApiModel from 'features/guest/models/guest-extended-api.model';
import { Observable } from 'rxjs';
import ConfigInitService from 'src/app/init/config-init.service';
import GuestApiModel from '../../models/guest-api.model';

@Injectable({
  providedIn: 'root',
})
export default class GuestApiService {
  public httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private readonly http: HttpClient, private readonly configServie: ConfigInitService) {}

  public getGuests(): Observable<GuestApiModel[]> {
    return this.http.get<GuestApiModel[]>(
      `${this.configServie.getConfigStatic().ACCREDITATION_CONTROLLER_BASE_URL}/party/guest/`
    );
  }

  public getGuestById(accreditationId: string): Observable<GuestAccreditionModel> {
    return this.http.get<GuestAccreditionModel>(
      `${
        this.configServie.getConfigStatic().ACCREDITATION_CONTROLLER_BASE_URL
      }/accreditation/guest/private/${accreditationId}`
    );
  }

  public saveGuest(guest: GuestApiModel): Observable<GuestApiModel> {
    return this.http.post<GuestApiModel>(
      `${this.configServie.getConfigStatic().ACCREDITATION_CONTROLLER_BASE_URL}/party/guest/`,
      guest,
      this.httpHeader
    );
  }

  public saveCSV(formdata: FormData): Observable<any> {
    this.httpHeader.headers.set('Content-Type', 'multipart/form-data');
    // check endpoint
    return this.http.post<FormData>(
      `${this.configServie.getConfigStatic().ACCREDITATION_CONTROLLER_BASE_URL}/party/guest/csv`,
      formdata,
      {
        headers: this.httpHeader.headers,
        observe: 'events',
        reportProgress: true,
      }
    );
  }

  public updateExtendedGuest(guest: GuestExtendedApiModel, accreditationId: string): Observable<GuestAccreditionModel> {
    return this.http.patch<GuestAccreditionModel>(
      `${
        this.configServie.getConfigStatic().ACCREDITATION_CONTROLLER_BASE_URL
      }/accreditation/guest/append/guest-proprietary-information/${accreditationId}`,
      guest,
      this.httpHeader
    );
  }
}
