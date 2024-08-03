import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { DialogAddTaskComponent } from '../dialog-add-task/dialog-add-task.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  tasks: any = [];

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    try {
      let url: string = 'http://127.0.0.1:8000/todos/';
      let response = await fetch(url);
      let json = await response.json();
      this.tasks = json;

      console.log('json ist', json);
      console.log('tasks ist', this.tasks);
    } catch (e) {
      console.error(e);
    }
  }

  openDialogAdProduct() {
    this.dialog.open(DialogAddTaskComponent);
  }
}
