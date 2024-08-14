import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogRef } from '@angular/material/dialog';
import { DatabaseService } from '../services/database.service';
import { MatSelectModule } from '@angular/material/select';

interface Tags {
  value: string;
  viewValue: string;
  pointClass: string;
}

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatCardModule,
    CommonModule,
    MatIconModule,
    MatSelectModule,
  ],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss',
})
export class TaskCardComponent implements OnInit {
  @Output() taskDeleted = new EventEmitter<number>();
  @Output() taskUpdated = new EventEmitter<void>();
  @Input() task: any;
  title: boolean = true;
  textAreaTitle: boolean = false;
  textAreaDescription: boolean = false;
  savedHeight: string = '';
  selectedColorValue: string = 'yellow';
  tagColor: string = '';
  newTitle: string = '';
  newDescription: string = '';

  tags: Tags[] = [
    { value: 'yellow', viewValue: 'Yellow', pointClass: 'point-yellow' },
    { value: 'green', viewValue: 'Green', pointClass: 'point-green' },
    { value: 'blue', viewValue: 'Blue', pointClass: 'point-blue' },
    { value: 'red', viewValue: 'Red', pointClass: 'point-red' },
    { value: 'orange', viewValue: 'Orange', pointClass: 'point-orange' },
    { value: 'purple', viewValue: 'Purple', pointClass: 'point-purple' },
    { value: 'magenta', viewValue: 'Magenta', pointClass: 'point-magenta' },
    { value: 'cyan', viewValue: 'Cyan', pointClass: 'point-cyan' },
  ];

  constructor(
    public dialogRef: MatDialogRef<TaskCardComponent>,
    private database: DatabaseService
  ) {}

  ngOnInit(): void {
    this.newTitle = this.task.title;
    this.newDescription = this.task.description;
    this.selectedColorValue = this.task.tags;
  }

  async onTagChange() {
    this.task.tags = this.selectedColorValue;
    await this.updateTask();
    this.taskUpdated.emit();
  }

  openTaskTitleTextArea() {
    this.textAreaTitle = true;

    if (this.textAreaDescription) {
      this.closeDescriptionArea();
    }
  }

  openTaskDescriptionTextArea() {
    this.textAreaDescription = true;

    if (this.textAreaTitle) {
      this.closeTextArea();
    }
  }

  closeTextArea() {
    this.textAreaTitle = false;
  }

  closeDescriptionArea() {
    this.textAreaDescription = false;
  }

  autoExpand(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto'; // Setzt die Höhe zurück
    textarea.style.height = textarea.scrollHeight + 'px'; // Passt die Höhe basierend auf dem Inhalt an

    // Höhe speichern
    this.savedHeight = textarea.style.height;
    console.log('die höhe in px is', this.savedHeight);
  }

  closeTask() {
    this.dialogRef.close();
  }

  async updateTaskCard() {
    this.task.title = this.newTitle;
    this.task.description = this.newDescription;
    this.task.tags = this.selectedColorValue;
    await this.updateTask();
    this.taskUpdated.emit();
  }

  async updateTask() {
    const taskData = {
      id: this.task.id,
      title: this.newTitle,
      description: this.newDescription,
      tags: this.selectedColorValue,
    };

    try {
      console.log('taskData', taskData);
      await this.database.updateTaskInDatabase(taskData);
    } catch (e) {
      console.error('Fehler beim speichern der Aufgabe:', e);
    } finally {
      this.closeTextArea();
      this.closeDescriptionArea();
    }
  }

  async deleteTask() {
    const taskData = {
      id: this.task.id,
    };

    try {
      await this.database.deleteTaskInDatabase(taskData);
      this.taskDeleted.emit(this.task.id);
    } catch (e) {
      console.error('Fehler beim löschen der Aufgabe:', e);
    } finally {
      this.closeTask();
    }
  }
}
