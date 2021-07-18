import { TestBed } from '@angular/core/testing';

import { BestGuard } from './best.guard';

describe('BestGuard', () => {
  let guard: BestGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(BestGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
