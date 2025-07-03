import { TestBed } from '@angular/core/testing';

import { TaskContextService } from './task-context.service';

describe('TaskContextService', () => {
  let service: TaskContextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskContextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
