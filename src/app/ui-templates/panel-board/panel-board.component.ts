import { Component, Input } from '@angular/core';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-panel-board',
  imports: [],
  templateUrl: './panel-board.component.html',
  styleUrl: './panel-board.component.css'
})
export class PanelBoardComponent {
  @Input() tasks : Task[] = [];
  @Input() state : string = '';
}
