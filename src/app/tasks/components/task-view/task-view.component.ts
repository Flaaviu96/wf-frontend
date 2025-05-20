import { Component } from '@angular/core';

@Component({
  selector: 'app-task-view',
  imports: [],
  templateUrl: './task-view.component.html',
  styleUrl: './task-view.component.css'
})
export class TaskViewComponent {
 task = {
    taskName: 'Example Task',
    description: 'This is a sample task description.',
    assignee: 'John Doe',
    status: 'In Progress',
    attachments: [
      { thumbnailUrl: 'https://via.placeholder.com/40?text=Doc1' },
      { thumbnailUrl: 'https://via.placeholder.com/40?text=Img2' },
      { thumbnailUrl: 'https://via.placeholder.com/40?text=Pdf3' },
      { thumbnailUrl: 'https://via.placeholder.com/40?text=File4' },
      { thumbnailUrl: 'https://via.placeholder.com/40?text=Zip5' },
      { thumbnailUrl: 'https://via.placeholder.com/40?text=Img6' },
      { thumbnailUrl: 'https://via.placeholder.com/40?text=Doc7' },
    ]
  };
}
