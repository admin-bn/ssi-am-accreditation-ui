import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatToolbarHarness } from '@angular/material/toolbar/testing';

import HeaderComponent from './header.component';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import AuthenticationService from '../authentication/authentication.service';
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
  isLoggedIn: (): Promise<boolean> => {
    return new Promise((resolve) => {
      resolve(true);
    });
  },
};
describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let loader: HarnessLoader;
  let authService: AuthenticationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [MatToolbarModule],
      providers: [{ provide: KeycloakService, useValue: keycloakServiceMock }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthenticationService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an instance of mat-toolbar', async () => {
    const toolbar = await loader.getAllHarnesses(MatToolbarHarness);

    expect(toolbar.length).toBe(1);
  });

  it('should set loggedInUser', async () => {
    spyOn(authService, 'loadUserProfile').and.returnValue(Promise.resolve({}));
    fixture.whenStable().then(() => {
      // call the getUserName method to get the user name
      const userName = spyOn(authService, 'getUserName');
      expect(component.loggedInUser).toBe('mock keycloak user');
    });
  });
});
