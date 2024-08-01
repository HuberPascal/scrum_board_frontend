import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  isSubmitting: boolean = false;

  async loginWithUsernameAndPassword() {
    this.isSubmitting = true;
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      username: this.username,
      password: this.password,
    });

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    try {
      let response = await fetch(
        'http://127.0.0.1:8000/login/',
        requestOptions
      );
      let json = await response.json();
      localStorage.setItem('token', json.token);
      this.isSubmitting = false;
      // redirect
    } catch (error) {
      console.error(error);
      this.isSubmitting = false;
    }
  }
}
