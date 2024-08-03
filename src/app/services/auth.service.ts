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

  public registerWithUsernameAndPassword(username: string, password: string) {
    const url = environment.baseUrl + '/register/';
    const body = {
      username: username,
      password: password,
    };
    return lastValueFrom(this.http.post(url, body));
  }

  public loginWithUsernameAndPassword(username: string, password: string) {
    const url = 'http://127.0.0.1:8000/login/';
    const body = {
      username: username,
      password: password,
    };
    // Typisieren der POST-Anfrage mit AuthResponse
    return lastValueFrom(this.http.post<AuthResponse>(url, body));
  }
}
