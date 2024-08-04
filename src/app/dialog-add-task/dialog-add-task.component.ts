import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

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

interface Priority {
  value: string;
  viewValue: string;
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
  ],
  templateUrl: './dialog-add-task.component.html',
  styleUrl: './dialog-add-task.component.scss',
})
export class DialogAddTaskComponent {
  taskName: string = '';
  taskDescription: string = '';
  selectedValue: string | undefined;

  priority: Priority[] = [
    { value: 'low', viewValue: 'Low' },
    { value: 'medium', viewValue: 'Medium' },
    { value: 'high', viewValue: 'High' },
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
}
