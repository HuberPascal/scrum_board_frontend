import { Component, inject, OnInit } from '@angular/core';
import { DialogAddTaskComponent } from '../dialog-add-task/dialog-add-task.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DashboardDragAndDropComponent } from '../dashboard-drag-and-drop/dashboard-drag-and-drop.component';
import { DatabaseService } from '../services/database.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, DashboardDragAndDropComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  tasks: any[] = [];
  loading: boolean = false;

  constructor(
    private database: DatabaseService,
    private authService: AuthService,
    private router: Router
  ) {}

  async ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.loadTasks();
    } else {
      this.router.navigate(['/login']);
    }
  }

  async loadTasks() {
    this.loading = true;
    try {
      this.tasks = await this.database.loadDataFromDatabase();
      this.loading = false;
    } catch (error) {
      console.error(error);
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

  reloadTasks() {
    this.loadTasks();
  }
}
