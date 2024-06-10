import { TestBed } from '@angular/core/testing';

import { ChangepasswordGuard } from './changepassword.guard';

describe('ChangepasswordGuard', () => {
  let guard: ChangepasswordGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ChangepasswordGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
