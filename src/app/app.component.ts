import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import AuthenticationService from './core/authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export default class AppComponent implements OnInit {
  public constructor(private readonly router: Router, private readonly authService: AuthenticationService) {}

  public ngOnInit(): void {
    // redirect based upon roles in keycloak
    let userRoles: Array<string>;
    this.authService.isLoggedIn().then((userIsLoggedIn: boolean) => {
      if (userIsLoggedIn) {
        userRoles = this.authService.getRoles();

        if (userRoles.indexOf('hr-admin') > -1) {
          this.router.navigate(['employee']);
        } else {
          this.router.navigate(['guest']);
        }
      }
    });
  }
}
