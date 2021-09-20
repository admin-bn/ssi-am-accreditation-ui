/* eslint-disable class-methods-use-this */
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GuestFormComponent } from '../../forms/guest-form/guest-form.component';
import FormValidator from '../../../../shared/utilities/form-validator';
import GuestApiModel from '../../models/guest-api.model';
import GuestStoreService from '../../services/stores/guest-store.service';
import { ApplicationURL } from '../../../../shared/utilities/application-url';

@Component({
  selector: 'app-guest-add',
  templateUrl: './guest-add.component.html',
  styleUrls: ['./guest-add.component.scss'],
  providers: [FormValidator],
})
export default class GuestAddComponent {
  @ViewChild(GuestFormComponent)
  private readonly guestFormComponent?: GuestFormComponent;

  public constructor(
    public readonly formValidator: FormValidator,
    private readonly guestStoreService: GuestStoreService,
    private readonly router: Router
  ) {}

  public submitAddGuest(): void {
    if (this.guestFormComponent?.guestForm.valid) {
      const guest = this.createGuestApiDTO();

      try {
        this.guestStoreService.addGuest(guest);
      } catch (error) {
        console.log(error);
      }
    }
  }

  public goToDashboard(): void {
    this.router.navigateByUrl(ApplicationURL.Guest);
  }

  private createGuestApiDTO(): GuestApiModel {
    const guestSanitize: GuestApiModel = this.sanitizeValues();

    guestSanitize.title = guestSanitize.title === '' ? 'Ms' : guestSanitize.title;

    const tValidFromDate = guestSanitize.validFromDate;
    const tvalidUntilDate = guestSanitize.validUntilDate;

    guestSanitize.validFromDate = this.extractDate(guestSanitize.validFromDate, guestSanitize.validFromTime);
    guestSanitize.validFromTime = this.extractDate(tValidFromDate, guestSanitize.validFromTime);
    guestSanitize.validUntilDate = this.extractDate(guestSanitize.validUntilDate, guestSanitize.validUntilTime);
    guestSanitize.validUntilTime = this.extractDate(tvalidUntilDate, guestSanitize.validUntilTime);

    return guestSanitize;
  }

  private sanitizeValues(): GuestApiModel {
    return this.formValidator.getSanitizedRawFormValues(this.guestFormComponent!.guestForm);
  }

  private extractDate(date: string, time: string): string {
    return date.concat('T', time, ':00.000Z');
  }
}
