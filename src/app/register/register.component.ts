import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  firstName: string = '';
  lastName: string = '';
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  async register() {
    try {
      let response = await this.authService.registerWithUsernameAndPassword(
        this.firstName,
        this.lastName,
        this.username,
        this.email,
        this.password
      );
      console.log(response);
      // redirect
    } catch (error) {
      console.error(error);
    }
  }
}
