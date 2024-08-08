import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogRef } from '@angular/material/dialog';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatCardModule,
    CommonModule,
    MatIconModule,
  ],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss',
})
export class TaskCardComponent {
  @Output() taskDeleted = new EventEmitter<number>();
  task: any;
  title: boolean = true;
  textAreaTitle: boolean = false;
  textAreaDescription: boolean = false;
  savedHeight: string = '';

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<TaskCardComponent>,
    private database: DatabaseService
  ) {}

  getTagClass(tag: string) {
    return `${tag}-class`;
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

  updateTask() {
    const taskData = {
      id: this.task.id,
      title: this.task.title,
      description: this.task.description,
    };

    try {
      this.database.updateTaskInDatabase(taskData);
    } catch (e) {
      console.error('Fehler beim speichern der Aufgabe:', e);
    } finally {
      this.closeTextArea();
      this.closeDescriptionArea();
    }
  }

  deleteTask() {
    const taskData = {
      id: this.task.id,
    };

    try {
      this.database.deleteTaskInDatabase(taskData);
    } catch (e) {
      console.error('Fehler beim löschen der Aufgabe:', e);
    } finally {
      this.closeTask();
      window.location.reload();
    }
  }
}
