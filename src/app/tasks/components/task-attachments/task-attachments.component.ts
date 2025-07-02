import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-task-attachments',
  imports: [CommonModule],
  templateUrl: './task-attachments.component.html',
  styleUrl: './task-attachments.component.css'
})
export class TaskAttachmentsComponent {
  @Input() hasWritePermission : boolean = false;
  selectedFileName: string | null = null;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedFileName = file.name;
     // this.uploadFile.emit(file);
    }
  }
}
