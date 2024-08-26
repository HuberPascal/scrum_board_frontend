import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-dialog-edit-contact-data',
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
  templateUrl: './dialog-edit-contact-data.component.html',
  styleUrl: './dialog-edit-contact-data.component.scss',
})
export class DialogEditContactDataComponent implements OnInit {
  readonly dialog = inject(MatDialog);

  contactData: any;
  firstName: string = '';
  lastName: string = '';
  email: string = '';

  constructor(
    public dialogRef: MatDialogRef<DialogEditContactDataComponent>,
    private database: DatabaseService
  ) {}

  ngOnInit(): void {
    if (this.contactData) {
      this.firstName = this.contactData.first_name;
      this.lastName = this.contactData.last_name;
      this.email = this.contactData.email;
    }
  }

  async saveContact() {
    const contactData = {
      first_name: this.firstName,
      last_name: this.lastName,
      email: this.email,
      id: this.contactData.id,
    };

    try {
      await this.database.updateContactInDatabase(contactData);
      this.dialogRef.close(true);
    } catch (error) {
      console.error('Fehler beim updaten der Aufgabe:', error);
    }
  }
}
