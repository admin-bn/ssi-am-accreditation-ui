import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationExtras, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import NotificationPageComponent from './notification-page.component';

describe('NotificationPageComponent', () => {
  let component: NotificationPageComponent;
  let fixture: ComponentFixture<NotificationPageComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotificationPageComponent],
      imports: [RouterTestingModule.withRoutes([{ path: 'creation-status', component: NotificationPageComponent }])],
    }).compileComponents();
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
    router.initialNavigation();
    spyOn(router, 'getCurrentNavigation').and.returnValue({ extras: { state: { success: true } } } as any);
    fixture = TestBed.createComponent(NotificationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
