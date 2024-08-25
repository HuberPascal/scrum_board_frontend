import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog-add-contact',
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
  templateUrl: './dialog-add-contact.component.html',
  styleUrl: './dialog-add-contact.component.scss',
})
export class DialogAddContactComponent implements OnInit {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  contacts: any[] = [];
  errorMessage: string = '';

  constructor(
    public dialogRef: MatDialogRef<DialogAddContactComponent>,
    private database: DatabaseService
  ) {}

  async ngOnInit(): Promise<void> {
    this.contacts = await this.database.loadContacts();
    console.log('contacts', this.contacts);
  }

  async saveContact() {
    if (this.validateEmail(this.email)) {
      const contactData = {
        first_name: this.firstName,
        last_name: this.lastName,
        email: this.email,
      };

      try {
        await this.database.saveContactInDatabase(contactData);
        this.dialogRef.close();
      } catch (error) {
        console.error('Fehler beim Speichern des Kontakts:', error);
      }
    } else {
      this.errorMessage = 'Bitte geben Sie eine gültige Email-Adresse ein.';
    }
  }

  validateEmail(email: string) {
    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return pattern.test(email);
  }
}
