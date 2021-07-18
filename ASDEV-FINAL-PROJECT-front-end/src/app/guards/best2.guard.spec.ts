import { TestBed } from '@angular/core/testing';

import { Best2Guard } from './best2.guard';

describe('Best2Guard', () => {
  let guard: Best2Guard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(Best2Guard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
