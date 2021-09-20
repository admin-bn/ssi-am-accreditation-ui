import { Component, OnInit } from '@angular/core';
import { KeycloakProfile } from 'keycloak-js';
import AuthenticationService from '../authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export default class HeaderComponent implements OnInit {
  loggedInUser: string | undefined;

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.authenticationService
      .isLoggedIn()
      .then((userLoggedIn: boolean) => {
        if (userLoggedIn) {
          this.loadUserProfile();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  private loadUserProfile(): void {
    this.authenticationService.loadUserProfile().then((userProfile: KeycloakProfile) => {
      if (userProfile) {
        this.loggedInUser = this.authenticationService.getUserName();
      }
    });
  }

  logout() {
    this.authenticationService.logout();
  }
}
