import { TestBed } from '@angular/core/testing';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';

import AuthenticationService from './authentication.service';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  const keycloakServiceMock = {
    logout: (): void => {},
    loadUserProfile: (): Promise<KeycloakProfile> => {
      return new Promise((resolve) => {
        resolve({});
      });
    },
    getUsername: (): string => {
      return 'mock keycloak user';
    },
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: KeycloakService, useValue: keycloakServiceMock }],
    });
    service = TestBed.inject(AuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
