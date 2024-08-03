import { Component, inject, OnInit } from '@angular/core';
import { DialogAddTaskComponent } from '../dialog-add-task/dialog-add-task.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  tasks: any = [];

  constructor(private http: HttpClient) {}

  async ngOnInit() {
    this.tasks = await this.loadData();
  }

  loadData() {
    const url: string = environment.baseUrl + '/todos/';
    return lastValueFrom(this.http.get(url));
  }

  openDialogAdProduct() {
    this.dialog.open(DialogAddTaskComponent);
  }
}
