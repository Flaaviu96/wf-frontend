import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSearchSelectComponent } from './user-search-select.component';

describe('UserSearchSelectComponent', () => {
  let component: UserSearchSelectComponent;
  let fixture: ComponentFixture<UserSearchSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserSearchSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserSearchSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
