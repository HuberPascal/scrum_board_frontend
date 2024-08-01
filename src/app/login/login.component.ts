import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

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

  constructor(private as: AuthService) {}

  async login() {
    try {
      let resp = await this.as.loginWithUsernameAndPassword(
        this.username,
        this.password
      );
      console.log(resp);
      this.isSubmitting = false;
      // redirect
    } catch (error) {
      console.error(error);
      this.isSubmitting = false;
    }
  }
}
