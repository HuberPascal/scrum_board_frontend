import { Component, inject, OnInit } from '@angular/core';
import { DialogAddTaskComponent } from '../dialog-add-task/dialog-add-task.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { DashboardDragAndDropComponent } from '../dashboard-drag-and-drop/dashboard-drag-and-drop.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, DashboardDragAndDropComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  tasks: any[] = [];

  constructor(private http: HttpClient) {}

  async ngOnInit() {
    try {
      this.tasks = await this.loadData();
      console.log('Geladene Aufgaben:', this.tasks); // Debugging: Geladene Daten anzeigen
    } catch (e) {
      console.error(e);
    }
  }

  loadData(): Promise<any> {
    const url: string = environment.baseUrl + '/todos/';
    return lastValueFrom(this.http.get<any>(url));
  }

  openDialogAddTask(taskType: string) {
    console.log('taskdata', taskType);
    const dialog = this.dialog.open(DialogAddTaskComponent);
    dialog.componentInstance.taskType = taskType;
  }
}
