import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editable-field',
  imports: [CommonModule,
    FormsModule
  ],
  templateUrl: './editable-field.component.html',
  styleUrl: './editable-field.component.css'
})
export class EditableFieldComponent {
  @Input() label : string = '';
  @Input() value : string = '';
  @Output() valueChange = new EventEmitter<string>();

  edit : boolean = false;

  enableEdit() {
    this.edit = true;
  }

  saveChange() {
    this.edit = false;
    this.valueChange.emit(this.value);
  }
}
