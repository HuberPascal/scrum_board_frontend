import { Component, inject, OnInit } from '@angular/core';
import { DialogAddTaskComponent } from '../dialog-add-task/dialog-add-task.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DashboardDragAndDropComponent } from '../dashboard-drag-and-drop/dashboard-drag-and-drop.component';
import { DatabaseService } from '../services/database.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { DialogAddContactComponent } from '../dialog-add-contact/dialog-add-contact.component';
import { DialogEditContactsComponent } from '../dialog-edit-contacts/dialog-edit-contacts.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    DashboardDragAndDropComponent,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  tasks: any[] = [];
  users: any[] = [];
  contacts: any = [];
  loading: boolean = false;
  firstName: string = '';

  constructor(
    private database: DatabaseService,
    private authService: AuthService,
    private router: Router
  ) {}

  async ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.loadTasks();
      this.loadUsers();
      this.loadContacts();
      this.firstName = localStorage.getItem('firstName') || '';
    } else {
      this.router.navigate(['/login']);
    }
  }

  async loadTasks() {
    this.loading = true;
    try {
      this.tasks = await this.database.loadTasksFromDatabase();
      this.loading = false;
    } catch (error) {
      console.error(error);
    }
  }

  async loadUsers() {
    try {
      this.users = await this.database.loadUsersFromDatabase();
    } catch (error) {
      console.error(error);
    }
  }

  async loadContacts() {
    try {
      this.contacts = await this.database.loadContacts();
      console.log('contacts', this.contacts);
    } catch (error) {
      console.error(error);
    }
  }

  onTaskDeleted(taskId: number) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
  }

  openDialogAddTask(taskType: string) {
    const dialogRef = this.dialog.open(DialogAddTaskComponent);
    dialogRef.componentInstance.taskType = taskType;
    dialogRef.componentInstance.contacts = this.contacts;

    dialogRef.componentInstance.taskCreated.subscribe((newTask: any) => {
      this.onTaskCreated(newTask);
    });
  }

  openDialogContact() {
    const dialogRef = this.dialog.open(DialogAddContactComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('test');
        this.loadContacts(); // Aktualisiere die Aufgabenliste nach dem Hinzufügen eines neuen Kontakts
      }
    });
  }

  openDialogEditContacts() {
    const dialogRef = this.dialog.open(DialogEditContactsComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('DialogEditContactsComponent');
      this.loadContacts();
    });
  }

  onTaskCreated(newTask: any) {
    this.tasks.push(newTask);
    this.loadTasks();
  }

  reloadTasks() {
    this.loadTasks();
  }

  logout() {
    this.authService.logout();
  }
}
