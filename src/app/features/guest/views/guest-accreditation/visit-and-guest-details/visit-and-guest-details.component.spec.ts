import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import NgswService from '../../../../../shared/services/ngsw.service';
import { VisitAndGuestDetailsComponent } from './visit-and-guest-details.component';

describe('VisitAndGuestDetailsComponent', () => {
  let component: VisitAndGuestDetailsComponent;
  let fixture: ComponentFixture<VisitAndGuestDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VisitAndGuestDetailsComponent],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: false }),
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
      ],
      providers: [NgswService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitAndGuestDetailsComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
