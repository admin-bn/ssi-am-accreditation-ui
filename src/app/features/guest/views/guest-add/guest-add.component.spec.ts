import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import GuestAddComponent from './guest-add.component';

describe('GuestAddComponent', () => {
  let component: GuestAddComponent;
  let fixture: ComponentFixture<GuestAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GuestAddComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestAddComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('instance should be successfully created', () => {
    expect(component).toBeTruthy();
  });
});
