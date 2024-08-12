import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

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

  constructor(private as: AuthService, private router: Router) {}

  async login() {
    this.isSubmitting = true;
    try {
      let response = await this.as.loginWithUsernameAndPassword(
        this.username,
        this.password
      );
      console.log('response ist:', response.token);

      if (response && response.token) {
        localStorage.setItem('authToken', response.token);
        this.router.navigateByUrl('/dashboard');
      }
      this.isSubmitting = false;
    } catch (error) {
      console.error(error);
      this.isSubmitting = false;
    }
  }
}
