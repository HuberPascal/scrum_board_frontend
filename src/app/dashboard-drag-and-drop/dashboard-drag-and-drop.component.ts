import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard-drag-and-drop',
  standalone: true,
  imports: [DragDropModule, MatCardModule, MatIconModule],
  templateUrl: './dashboard-drag-and-drop.component.html',
  styleUrl: './dashboard-drag-and-drop.component.scss',
})
export class DashboardDragAndDropComponent implements OnInit, OnChanges {
  @Input() tasks: any[] = [];

  ngOnInit(): void {
    this.updateTasks();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['message']) {
      console.log('Änderungen in der Kindkomponente:', this.tasks);
      this.updateTasks();
    }
  }

  updateTasks() {
    if (this.tasks) {
      this.tasks = this.tasks;
      console.log('Aktualisierte Aufgaben in der Kindkomponente:', this.tasks);
    }
  }
}
