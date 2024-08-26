import { Component, inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { DatabaseService } from '../services/database.service';
import { MatIconModule } from '@angular/material/icon';
import { DialogEditContactDataComponent } from '../dialog-edit-contact-data/dialog-edit-contact-data.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dialog-edit-contacts',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogTitle,
    MatDialogContent,
  ],
  templateUrl: './dialog-edit-contacts.component.html',
  styleUrl: './dialog-edit-contacts.component.scss',
})
export class DialogEditContactsComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  contacts: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<DialogEditContactsComponent>,
    private database: DatabaseService
  ) {}

  async ngOnInit(): Promise<void> {
    this.loadContacts();
  }

  async loadContacts() {
    this.contacts = await this.database.loadContacts();
    console.log('contacts', this.contacts);
  }

  editContact(id: number) {
    const dialogRef = this.dialog.open(DialogEditContactDataComponent);
    const contactData = this.contacts.find((contact) => contact.id == id);
    dialogRef.componentInstance.contactData = contactData;

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        console.log('fewfeqwfwg');
        this.contacts = await this.database.loadContacts();
      }
    });

    console.log('data', contactData);
  }

  async deleteContact(id: number) {
    console.log('id', id);
    try {
      await this.database.deleteContact(id);
      this.contacts = await this.database.loadContacts();
    } catch (error) {
      console.error('Fehler beim löschen der Aufgabe:', error);
    }
  }

  async saveEditContact() {}
}
