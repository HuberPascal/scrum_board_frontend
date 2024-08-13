import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  url: string = environment.baseUrl + '/todos/';

  constructor(private http: HttpClient) {}

  async loadDataFromDatabase(): Promise<any> {
    try {
      const response = await lastValueFrom(this.http.get<any>(this.url));
      return response;
    } catch (e) {
      console.error('Fehler beim laden der Aufgaben von der Datenbank:', e);
      return [];
    }
  }

  async saveTaskInDatabase(taskData: any): Promise<any> {
    try {
      const response = await lastValueFrom(
        this.http.post<any>(this.url, taskData)
      );
      return response;
    } catch (e) {
      console.error('Fehler beim Speichern der Aufgabe in der Datenbank:', e);
      throw e; // Fehler weiterwerfen, damit er in der aufrufenden Methode behandelt wird
    }
  }

  async updateTaskInDatabase(taskData: any): Promise<void> {
    try {
      await lastValueFrom(
        this.http.patch(`${this.url}${taskData.id}/`, taskData)
      );
    } catch (e) {
      console.error('Fehler beim updaten der Aufgabe in der Datenbank:', e);
    }
  }

  async deleteTaskInDatabase(taskData: any): Promise<void> {
    try {
      await lastValueFrom(
        this.http.delete(`${this.url}${taskData.id}/`, { body: taskData })
      );
    } catch (e) {
      console.error('Fehler beim löschen der Aufgabe in der Datenbank:', e);
    }
  }
}
