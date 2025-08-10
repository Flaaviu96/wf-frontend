import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCardViewComponent } from './task-card-view.component';

describe('TaskCardViewComponent', () => {
  let component: TaskCardViewComponent;
  let fixture: ComponentFixture<TaskCardViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskCardViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskCardViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
