import { TestBed } from '@angular/core/testing';

import { AccountSvcService } from './account.service';

describe('AccountSvcService', () => {
  let service: AccountSvcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountSvcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
