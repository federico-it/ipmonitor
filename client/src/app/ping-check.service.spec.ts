import { TestBed } from '@angular/core/testing';

import { PingCheckService } from './ping-check.service';

describe('PingCheckService', () => {
  let service: PingCheckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PingCheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
