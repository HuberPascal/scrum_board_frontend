import { Component, EventEmitter, OnInit, Output, output } from '@angular/core';
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
import { MatSelectModule } from '@angular/material/select';
import { DatabaseService } from '../services/database.service';

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
export class DialogAddTaskComponent implements OnInit {
  @Output() taskCreated = new EventEmitter<any>();
  users: any[] = [];
  contacts: any[] = [];
  taskName: string = '';
  taskDescription: string = '';
  selectedColorValue: string = 'yellow';
  taskType: string = '';
  selectedMembers: any[] = [];

  tags: Tags[] = [
    { value: 'yellow', viewValue: 'Yellow', pointClass: 'point-yellow' },
    { value: 'green', viewValue: 'Green', pointClass: 'point-green' },
    { value: 'blue', viewValue: 'Blue', pointClass: 'point-blue' },
    { value: 'red', viewValue: 'Rot', pointClass: 'point-red' },
    { value: 'orange', viewValue: 'Orange', pointClass: 'point-orange' },
    { value: 'purple', viewValue: 'Purple', pointClass: 'point-purple' },
    { value: 'magenta', viewValue: 'Magenta', pointClass: 'point-magenta' },
    { value: 'cyan', viewValue: 'Cyan', pointClass: 'point-cyan' },
  ];

  constructor(
    public dialogRef: MatDialogRef<DialogAddTaskComponent>,
    private database: DatabaseService
  ) {}

  async ngOnInit(): Promise<void> {
    this.users = await this.database.loadUsersFromDatabase();
  }

  async saveTask() {
    const taskData = {
      title: this.taskName,
      description: this.taskDescription,
      tags: this.selectedColorValue,
      author: 1,
      checked: false,
      taskType: this.taskType,
      member_ids: this.selectedMembers.map((member) => member.id),
    };

    try {
      const savedTask = await this.database.saveTaskInDatabase(taskData);
      this.taskCreated.emit(savedTask);

      this.dialogRef.close(true);
    } catch (error) {
      console.error('Fehler beim Speichern der Aufgabe:', error);
    }
  }

  onColorChange(event: any) {
    this.selectedColorValue = event.value;
  }
}
