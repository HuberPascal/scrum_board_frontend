import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [FormsModule, MatButtonModule, MatCardModule, CommonModule],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss',
})
export class TaskCardComponent {
  task: any;
  title: boolean = true;
  textAreaTitle: boolean = false;
  textAreaDescription: boolean = false;

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

  saveTaskTitle() {
    this.closeTextArea();
  }

  saveTaskDescription() {
    this.closeDescriptionArea();
  }
}
