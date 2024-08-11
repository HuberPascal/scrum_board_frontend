import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
  inject,
} from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';

import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { TaskCardComponent } from '../task-card/task-card.component';
import { DatabaseService } from '../services/database.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-dashboard-drag-and-drop',
  standalone: true,
  imports: [
    DragDropModule,
    MatCardModule,
    MatIconModule,
    CommonModule,
    CdkDropList,
    CdkDrag,
    MatProgressSpinnerModule,
  ],
  templateUrl: './dashboard-drag-and-drop.component.html',
  styleUrl: './dashboard-drag-and-drop.component.scss',
})
export class DashboardDragAndDropComponent implements OnInit, OnChanges {
  readonly dialog = inject(MatDialog);

  @Input() tasks: any[] = [];
  @Output() openDialogAddTask: EventEmitter<string> = new EventEmitter();
  @Output() taskDeleted = new EventEmitter<number>();
  @Output() reloadTasks = new EventEmitter<void>();
  @Input() loading: boolean = false;
  todoTasks: any[] = [];
  doTodoyTasks: any[] = [];
  inProgressTasks: any[] = [];
  doneTasks: any[] = [];
  currentTask: any;

  constructor(private database: DatabaseService) {}

  ngOnInit(): void {
    this.pushTasksInArray();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tasks'] && changes['tasks'].currentValue) {
      console.log('Änderungen in der Kindkomponente:', this.tasks);
      this.pushTasksInArray();
    }
  }

  triggerOpenDialog(taskType: string) {
    this.openDialogAddTask.emit(taskType);
  }

  openTaskCard(task: any) {
    const dialogRef = this.dialog.open(TaskCardComponent);
    dialogRef.componentInstance.task = task;

    dialogRef.componentInstance.taskDeleted.subscribe((taskId: number) => {
      this.onTaskDeleted(taskId);
    });

    dialogRef.componentInstance.taskUpdated.subscribe(() => {
      this.loadDataAgain(); // Aufruf der Funktion, wenn das Event ausgelöst wird
    });
  }

  loadDataAgain() {
    this.reloadTasks.emit();
  }

  onTaskDeleted(taskId: number) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
    this.taskDeleted.emit(taskId); // An die übergeordnete Komponente weiterleiten
  }

  pushTasksInArray() {
    this.todoTasks = [];
    this.doTodoyTasks = [];
    this.inProgressTasks = [];
    this.doneTasks = [];

    this.tasks.forEach((task) => {
      switch (task.taskType) {
        case 'todo':
          this.todoTasks.push(task);
          break;
        case 'doToday':
          this.doTodoyTasks.push(task);
          break;
        case 'inProgress':
          this.inProgressTasks.push(task);
          break;
        case 'done':
          this.doneTasks.push(task);
      }
    });
  }

  getTagClass(tag: string): string {
    return `${tag}-class`;
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.udpateTaskStatus(event);
    }
  }

  udpateTaskStatus(event: CdkDragDrop<string[]>) {
    this.currentTask = event.item.data;

    if (event.container.data === this.todoTasks) {
      this.currentTask.taskType = 'todo';
    } else if (event.container.data === this.doTodoyTasks) {
      this.currentTask.taskType = 'doToday';
    } else if (event.container.data === this.inProgressTasks) {
      this.currentTask.taskType = 'inProgress';
    } else if (event.container.data === this.doneTasks) {
      this.currentTask.taskType = 'done';
    }
    this.database.updateTaskInDatabase(this.currentTask);
  }
}
