import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import GuestApiService from './guest-api.service';

describe('GuestApiService', () => {
  let service: GuestApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(GuestApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
