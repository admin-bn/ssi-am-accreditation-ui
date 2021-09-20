import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import GuestStoreService from './guest-store.service';

describe('GuestStoreService', () => {
  let service: GuestStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
    });
    service = TestBed.inject(GuestStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
