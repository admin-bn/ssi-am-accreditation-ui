/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { GuestCreationStatusComponent } from './guest-creation-status.component';

class RouterMock {
  public getCurrentNavigation(): any {
    return {
      extras: {
        state: {
          success: true,
        },
      },
    };
  }
}

describe('GuestCreationStatusComponent', () => {
  let component: GuestCreationStatusComponent;
  let fixture: ComponentFixture<GuestCreationStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GuestCreationStatusComponent],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: Router,
          useClass: RouterMock,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestCreationStatusComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('instance should be successfully created', () => {
    expect(component).toBeTruthy();
  });
});
