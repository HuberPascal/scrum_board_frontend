import { Component, EventEmitter, Output, output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { environment } from '../../environments/environment';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { DatabaseService } from '../services/database.service';

interface Priority {
  value: string;
  viewValue: string;
}

interface Tags {
  value: string;
  viewValue: string;
  pointClass: string;
}

@Component({
  selector: 'app-dialog-add-task',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogClose,
    MatDialogActions,
    MatButtonModule,
    MatSelectModule,
    CommonModule,
  ],
  templateUrl: './dialog-add-task.component.html',
  styleUrl: './dialog-add-task.component.scss',
})
export class DialogAddTaskComponent {
  @Output() taskCreated = new EventEmitter<any>();
  taskName: string = '';
  taskDescription: string = '';
  selectedColorValue: string = 'yellow';
  taskType: string = '';

  tags: Tags[] = [
    { value: 'yellow', viewValue: 'Yellow', pointClass: 'point-yellow' },
    { value: 'green', viewValue: 'Green', pointClass: 'point-green' },
    { value: 'blue', viewValue: 'Blue', pointClass: 'point-blue' },
  ];

  constructor(
    public dialogRef: MatDialogRef<DialogAddTaskComponent>,
    private database: DatabaseService
  ) {}

  async saveTask() {
    const taskData = {
      title: this.taskName,
      description: this.taskDescription,
      tags: this.selectedColorValue,
      author: 1,
      checked: false,
      taskType: this.taskType,
    };

    try {
      const savedTask = await this.database.saveTaskInDatabase(taskData);
      this.taskCreated.emit(savedTask);

      this.dialogRef.close();
    } catch (e) {
      console.error('Fehler beim Speichern der Aufgabe:', e);
    }
  }

  onColorChange(event: any) {
    this.selectedColorValue = event.value;
  }
}
