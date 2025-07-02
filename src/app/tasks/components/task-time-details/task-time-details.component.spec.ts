import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskTimeDetailsComponent } from './task-time-details.component';

describe('TaskTimeDetailsComponent', () => {
  let component: TaskTimeDetailsComponent;
  let fixture: ComponentFixture<TaskTimeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskTimeDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskTimeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
