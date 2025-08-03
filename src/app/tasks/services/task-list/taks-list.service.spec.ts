import { TestBed } from '@angular/core/testing';

import { TaksListService } from './taks-list.service';

describe('TaksListService', () => {
  let service: TaksListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaksListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
