import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-drag-and-drop',
  standalone: true,
  imports: [DragDropModule, MatCardModule, MatIconModule, CommonModule],
  templateUrl: './dashboard-drag-and-drop.component.html',
  styleUrl: './dashboard-drag-and-drop.component.scss',
})
export class DashboardDragAndDropComponent implements OnInit, OnChanges {
  @Input() tasks: any[] = [];
  @Output() openDialogAddTask: EventEmitter<string> = new EventEmitter();
  todoTasks: any[] = [];
  doTodoyTasks: any[] = [];
  inProgressTasks: any[] = [];
  doneTasks: any[] = [];

  ngOnInit(): void {
    this.updateTasks();
    this.pushTasksInArray();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tasks'] && changes['tasks'].currentValue) {
      console.log('Änderungen in der Kindkomponente:', this.tasks);
      this.updateTasks();
      this.pushTasksInArray();
    }
  }

  updateTasks() {
    if (this.tasks) {
      this.tasks = this.tasks;
      console.log('Aktualisierte Aufgaben in der Kindkomponente:', this.tasks);
    }
  }

  triggerOpenDialog(taskType: string) {
    this.openDialogAddTask.emit(taskType);
  }

  pushTasksInArray() {
    console.log('wird ausgeführt', this.tasks);
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
    switch (tag) {
      case 'yellow':
        return 'yellow-class';
      case 'blue':
        return 'blue-class';
      case 'green':
        return 'green-class';
      default:
        'yellow;';
        return '';
    }
  }
}
