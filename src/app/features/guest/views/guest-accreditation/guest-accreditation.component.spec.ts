import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GuestAccreditationComponent } from './guest-accreditation.component';

describe('GuestAccreditationComponent', () => {
  let component: GuestAccreditationComponent;
  let fixture: ComponentFixture<GuestAccreditationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GuestAccreditationComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestAccreditationComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('instance should be successfully created', () => {
    expect(component).toBeTruthy();
  });
});
