import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface AuthResponse {
  token: string;
  user_id: number;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public async registerWithUsernameAndPassword(
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string
  ): Promise<any> {
    const url = environment.baseUrl + '/register/';
    const body = {
      first_name: firstName,
      last_name: lastName,
      username,
      email,
      password,
    };
    const headers = { 'Content-Type': 'application/json' };

    try {
      return await lastValueFrom(this.http.post(url, body, { headers }));
    } catch (error) {
      console.error('Registration error', error);
      throw new Error('Registration failed. Please try again.');
    }
  }

  public async loginWithUsernameAndPassword(
    username: string,
    password: string
  ): Promise<AuthResponse> {
    const url = environment.baseUrl + '/login/';
    const body = { username, password };
    const headers = { 'Content-Type': 'application/json' };

    try {
      return await lastValueFrom(
        this.http.post<AuthResponse>(url, body, { headers })
      );
    } catch (error) {
      console.error('Login failed', error);
      throw new Error('Login failed. Please try again later.');
    }
  }
}
