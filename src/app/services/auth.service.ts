import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface AuthResponse {
  token: string;
  user_id: number;
  email: string;
  first_name: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  public async registerWithUsernameAndPassword(
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string
  ): Promise<any> {
    const url = `${environment.baseUrl}/auth/register/`;
    const body = {
      first_name: firstName,
      last_name: lastName,
      username,
      email,
      password,
    };
    const headers = { 'Content-Type': 'application/json' };

    try {
      const response = await lastValueFrom(
        this.http.post<AuthResponse>(url, body, { headers })
      );
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('firstName', response.first_name);
      this.router.navigateByUrl('/dashboard');
    } catch (error) {
      console.error('Registration error', error);
      throw new Error('Registration failed. Please try again.');
    }
  }

  public async loginWithUsernameAndPassword(
    username: string,
    password: string
  ): Promise<void> {
    const url = `${environment.baseUrl}/auth/login/`;
    const body = { username, password };
    const headers = { 'Content-Type': 'application/json' };

    try {
      const response = await lastValueFrom(
        this.http.post<AuthResponse>(url, body, { headers })
      );
      console.log('der register ist', response);
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('firstName', response.first_name);
      this.router.navigateByUrl('/dashboard');
    } catch (error) {
      console.error('Login failed', error);
      throw new Error('Login failed. Please try again later.');
    }
  }

  public getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  public isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token; // Gibt true zurück, wenn ein Token existiert
  }

  public logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('firstName');
    this.router.navigate(['/login']); // Weiterleitung zur Login-Seite
  }
}
