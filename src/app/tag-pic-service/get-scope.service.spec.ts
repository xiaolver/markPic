import { TestBed } from '@angular/core/testing';

import { GetScopeService } from './get-scope.service';

describe('GetScopeService', () => {
  let service: GetScopeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetScopeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
