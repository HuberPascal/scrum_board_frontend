import { Component, inject, OnInit } from '@angular/core';
import { DialogAddTaskComponent } from '../dialog-add-task/dialog-add-task.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DashboardDragAndDropComponent } from '../dashboard-drag-and-drop/dashboard-drag-and-drop.component';
import { DatabaseService } from '../services/database.service';

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

  constructor(private database: DatabaseService) {}

  async ngOnInit() {
    this.loadTasks();
  }

  async loadTasks() {
    try {
      this.tasks = await this.database.loadDataFromDatabase();
    } catch (e) {
      console.error(e);
    }
  }

  onTaskDeleted(taskId: number) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
  }

  openDialogAddTask(taskType: string) {
    const dialogRef = this.dialog.open(DialogAddTaskComponent);
    dialogRef.componentInstance.taskType = taskType;

    dialogRef.componentInstance.taskCreated.subscribe((newTask: any) => {
      this.onTaskCreated(newTask);
    });
  }

  onTaskCreated(newTask: any) {
    this.tasks.push(newTask);
    this.loadTasks();
  }
}
