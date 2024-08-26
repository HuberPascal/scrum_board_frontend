import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  todos_url: string = `${environment.baseUrl}/todos/`;
  users_url: string = `${environment.baseUrl}/users/`;
  contacts_url: string = `${environment.baseUrl}/contacts/`;

  constructor(private http: HttpClient) {}

  async loadTasksFromDatabase(): Promise<any> {
    try {
      const response = await lastValueFrom(this.http.get<any>(this.todos_url));
      console.log('response', response);
      return response;
    } catch (error) {
      console.error('Fehler beim laden der Aufgaben von der Datenbank:', error);
      return [];
    }
  }

  async saveTaskInDatabase(taskData: any): Promise<any> {
    try {
      const response = await lastValueFrom(
        this.http.post<any>(this.todos_url, taskData)
      );
      return response;
    } catch (error) {
      console.error(
        'Fehler beim Speichern der Aufgabe in der Datenbank:',
        error
      );
      throw error; // Fehler weiterwerfen, damit er in der aufrufenden Methode behandelt wird
    }
  }

  async updateTaskInDatabase(taskData: any): Promise<void> {
    try {
      const response = await lastValueFrom(
        this.http.patch(`${this.todos_url}${taskData.id}/`, taskData)
      );
    } catch (error) {
      console.error('Fehler beim updaten der Aufgabe in der Datenbank:', error);
    }
  }

  async deleteTaskInDatabase(taskData: any): Promise<void> {
    try {
      await lastValueFrom(
        this.http.delete(`${this.todos_url}${taskData.id}/`, { body: taskData })
      );
    } catch (error) {
      console.error('Fehler beim löschen der Aufgabe in der Datenbank:', error);
    }
  }

  async loadUsersFromDatabase(): Promise<any> {
    try {
      const response = await lastValueFrom(this.http.get<any>(this.users_url));
      return response;
    } catch (error) {
      console.error('Fehler beim laden der Users von der Datenbank:', error);
    }
  }

  async saveContactInDatabase(contactData: any): Promise<any> {
    try {
      const response = await lastValueFrom(
        this.http.post<any>(this.contacts_url, contactData)
      );
      return response;
    } catch (error) {
      console.error(
        'Fehler beim speichern der Kontakte in der Datenbank:',
        error
      );
      throw error;
    }
  }

  async loadContacts() {
    try {
      const response = await lastValueFrom(
        this.http.get<any>(this.contacts_url)
      );
      return response;
    } catch (error) {
      console.error('Fehler beim laden der Kontakte von der Datenbank:', error);
    }
  }

  async deleteContact(id: number): Promise<void> {
    try {
      const response = await lastValueFrom(
        this.http.delete<any>(`${this.contacts_url}${id}/`)
      );
    } catch (error) {
      console.error(
        'Fehler beim löschen des Kontakts in der Datenbank:',
        error
      );
    }
  }

  async updateContactInDatabase(contactData: any): Promise<void> {
    try {
      const response = await lastValueFrom(
        this.http.patch(`${this.contacts_url}${contactData.id}/`, contactData)
      );
    } catch (error) {
      console.error(
        'Fehler beim updaten des Kontakts in der Datenbank:',
        error
      );
    }
  }
}
