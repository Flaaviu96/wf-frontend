import { TestBed } from '@angular/core/testing';

import { UserSearchAutocompleteService } from './user-search-autocomplete.service';

describe('UserSearchAutocompleteService', () => {
  let service: UserSearchAutocompleteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserSearchAutocompleteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
