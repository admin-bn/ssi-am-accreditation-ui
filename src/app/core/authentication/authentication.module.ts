import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import ConfigInitService from '../../init/config-init.service';
import keyclockInitializer from './keycloak-initializer';

@NgModule({
  declarations: [],
  imports: [CommonModule, KeycloakAngularModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: keyclockInitializer,
      multi: true,
      deps: [KeycloakService, ConfigInitService],
    },
  ],
})
export default class AuthenticationModule {}
