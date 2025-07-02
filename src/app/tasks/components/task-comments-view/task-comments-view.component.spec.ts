import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCommentsViewComponent } from './task-comments-view.component';

describe('TaskCommentsViewComponent', () => {
  let component: TaskCommentsViewComponent;
  let fixture: ComponentFixture<TaskCommentsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskCommentsViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskCommentsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
