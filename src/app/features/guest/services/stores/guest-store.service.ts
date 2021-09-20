/* eslint-disable class-methods-use-this */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import GuestApiModel from 'features/guest/models/guest-api.model';
import GuestViewModel from 'features/guest/models/guest-view.model';
import { map, takeUntil } from 'rxjs/operators';
import AbstractStore from 'shared/abstractions/store.abstract';
import { ApplicationURL } from 'shared/utilities/application-url';
import GuestAccreditionModel from 'features/guest/models/guest-accreditation.model';
import GuestExtendedApiModel from 'features/guest/models/guest-extended-api.model';
import { Observable, Subject } from 'rxjs';
import GuestAccreditationQRCodeApiModel from 'features/guest/models/guest-accreditation-qr-code-api.model';
import GuestApiService from '../api/guest-api.service';
import GuestAccreditationApiService from '../api/guest-accreditation-api.service';

@Injectable({
  providedIn: 'root',
})
export default class GuestStoreService extends AbstractStore<GuestViewModel[]> {
  private basisIdIsProcessed: Subject<boolean> = new Subject();

  private credentialsOffered: Subject<boolean> = new Subject();

  public $credentialsOfferedObservable = this.credentialsOffered.asObservable();

  constructor(
    private readonly guestApiService: GuestApiService,
    private readonly guestAccreditationApiService: GuestAccreditationApiService,
    private readonly router: Router
  ) {
    super();
  }

  protected buildStore(..._args: any): any {
    return this.guestApiService
      .getGuests()
      .pipe(map((apiModel: GuestApiModel[]) => apiModel.map((el) => Object.assign(new GuestViewModel(), el))));
  }

  private update(data: GuestViewModel | GuestViewModel[]): GuestViewModel[] {
    if (Array.isArray(data)) {
      this.storeSubject.value.push(Object.assign(new GuestViewModel(), data));
      return this.storeSubject.value;
    }
    this.storeSubject.value.push(data);

    return this.storeSubject.value;
  }

  public handleCSVUpload(formData: FormData): void {
    this.guestApiService.saveCSV(formData).subscribe(
      (response: GuestViewModel | GuestViewModel[]) => {
        this.storeSubject.next(this.update(response));
        this.handleOnResponse(true);
      },
      (error) => {
        console.log(error);
        this.handleOnResponse(false);
      }
    );
  }

  public getGuests(): Observable<GuestApiModel[]> {
    return this.guestApiService.getGuests().pipe(map((result: any) => result));
  }

  public getGuestById(accreditationId: string): Observable<GuestAccreditionModel> {
    return this.guestApiService.getGuestById(accreditationId).pipe(map((result: GuestAccreditionModel) => result));
  }

  public addGuest(guest: GuestApiModel): void {
    this.guestApiService.saveGuest(guest).subscribe(
      () => {
        // this.storeSubject.next(this.update(response));
        this.handleOnResponse(true);
      },
      (error: any) => {
        console.error('Error', error);
        this.handleOnResponse(false);
      }
    );
  }

  public extendGuestData(guest: GuestExtendedApiModel, accreditationId: string): Observable<any> {
    return this.guestApiService.updateExtendedGuest(guest, accreditationId);
  }

  public downloadEmail(id: string): Observable<any> {
    return this.guestAccreditationApiService.getInvitationEmail(id);
  }

  public getQRCode(accreditationId: string): Observable<string> {
    return this.guestAccreditationApiService
      .getQRCode(accreditationId)
      .pipe(
        map((qrCodeApiModel: GuestAccreditationQRCodeApiModel) => qrCodeApiModel.connectionQrCode.replace(/\\/g, ''))
      );
  }

  public offerCredential(accreditationId: string): void {
    this.guestAccreditationApiService.offerCredential(accreditationId).subscribe(() => {
      this.pollCredentialAcceptance(accreditationId).subscribe();
    });
  }

  public pollBasisIdProcessing(accreditationId: string): Observable<any> {
    if (!this.basisIdIsProcessed || this.basisIdIsProcessed.isStopped) {
      this.basisIdIsProcessed = new Subject();
    }

    const statusChangeObservable = new Observable((observer) => {
      const requestInterval = setInterval(() => {
        this.guestAccreditationApiService.getBasisIdCheckCompletionStatus(accreditationId).subscribe(
          (basisIdCheck: any) => {
            if (basisIdCheck.status) {
              observer.next(basisIdCheck);
              observer.complete();
              this.basisIdIsProcessed.next(true);
            }
          },
          (error) => {
            console.log(error);
          }
        );
      }, 5000);

      return () => {
        clearInterval(requestInterval);
      };
    });

    return statusChangeObservable.pipe(takeUntil(this.basisIdIsProcessed));
  }

  public pollCredentialAcceptance(accreditationId: string): Observable<any> {
    if (!this.credentialsOffered || this.credentialsOffered.isStopped) {
      this.credentialsOffered = new Subject();
    }

    const statusChangeObservable = new Observable((observer) => {
      const requestInterval = setInterval(() => {
        this.guestAccreditationApiService.getAccreditationCompletionStatus(accreditationId).subscribe(
          (completionStatus: any) => {
            console.log('POLLED', completionStatus);
            if (completionStatus.status) {
              observer.next(completionStatus);
              observer.complete();
              this.credentialsOffered.next(true);
            }
          },
          (error) => {
            console.log(error);
          }
        );
      }, 5000);

      return () => {
        clearInterval(requestInterval);
      };
    });

    return statusChangeObservable.pipe(takeUntil(this.credentialsOffered));
  }

  private handleOnResponse(status: boolean): void {
    this.router.navigate([ApplicationURL.GuestCreationStatus], {
      state: {
        success: status,
      },
    });
  }
}
