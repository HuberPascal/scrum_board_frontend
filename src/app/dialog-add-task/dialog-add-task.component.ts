import { Component } from '@angular/core';
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
  taskName: string = '';
  taskDescription: string = '';
  selectedValue: string | undefined;
  selectedColorValue: string = 'yellow';

  priority: Priority[] = [
    { value: 'low', viewValue: 'Low' },
    { value: 'medium', viewValue: 'Medium' },
    { value: 'high', viewValue: 'High' },
  ];

  tags: Tags[] = [
    { value: 'yellow', viewValue: 'Yellow', pointClass: 'point-yellow' },
    { value: 'green', viewValue: 'Green', pointClass: 'point-green' },
    { value: 'blue', viewValue: 'Blue', pointClass: 'point-blue' },
  ];

  constructor(
    public dialogRef: MatDialogRef<DialogAddTaskComponent>,
    private http: HttpClient
  ) {}

  async saveTask() {
    this.dialogRef.close();
    console.log('prio ist', this.selectedValue);

    const url: string = environment.baseUrl + '/todos/';

    const taskData = {
      title: this.taskName,
      description: this.taskDescription,
      priority: this.selectedValue,
      author: 1,
      checked: false,
    };

    try {
      const response = await lastValueFrom(this.http.post(url, taskData));
      console.log('Aufgabe erfolgreich gespeichert:', response);
    } catch (e) {
      console.error('Fehler beim Speichern der Aufgabe:', e);
    }
  }

  onColorChange(event: any) {
    this.selectedColorValue = event.value;
    console.log('Ausgewählte Farbe:', this.selectedColorValue);
  }
}
