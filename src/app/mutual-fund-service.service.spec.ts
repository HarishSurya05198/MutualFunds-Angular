import { TestBed } from '@angular/core/testing';

import { MutualFundServiceService } from './mutual-fund-service.service';

describe('MutualFundServiceService', () => {
  let service: MutualFundServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MutualFundServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
