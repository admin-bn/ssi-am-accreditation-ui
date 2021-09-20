/* eslint-disable import/prefer-default-export */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationURL } from '../../../../shared/utilities/application-url';

@Component({
  selector: 'app-guest-creation-status',
  templateUrl: './guest-creation-status.component.html',
  styleUrls: ['./guest-creation-status.component.scss'],
})
export class GuestCreationStatusComponent {
  public isGuestAddSuccess: boolean = false;

  public successTitle = 'Gästeeinladung erfolgreich versendet!';

  public errorTitle = 'Erstellung des digitalen Gästeausweises fehlgeschlagen!';

  public successDescription =
    'Sie haben die Einladung erfolgreich an den Gast versendet. Ihr Gast wird eine Email mit einer Anleitung und einem QR-Code erhalten mit welchen sie Ihren digitalen Gästeausweis erstellen können.';

  public errorDescription = 'Ein Fehler ist aufgetreten :(';

  public constructor(private readonly router: Router) {
    this.isGuestAddSuccess = this.router.getCurrentNavigation()!.extras.state?.success;
  }

  public getStatusTitle(): string {
    return this.isGuestAddSuccess ? this.successTitle : this.errorTitle;
  }

  public getStatusDescription(): string {
    return this.isGuestAddSuccess ? this.successDescription : this.errorDescription;
  }

  public goToAddGuest(): void {
    this.router.navigateByUrl(ApplicationURL.GuestAdd);
  }

  public goToDashboard(): void {
    this.router.navigateByUrl(ApplicationURL.Guest);
  }
}
