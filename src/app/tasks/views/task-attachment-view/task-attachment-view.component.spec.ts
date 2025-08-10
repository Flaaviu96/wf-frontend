import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskAttachmentViewComponent } from './task-attachment-view.component';

describe('TaskAttachmentViewComponent', () => {
  let component: TaskAttachmentViewComponent;
  let fixture: ComponentFixture<TaskAttachmentViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskAttachmentViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskAttachmentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
