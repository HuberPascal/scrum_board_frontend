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
  username: string = '';
  password: string = '';

  constructor(private as: AuthService) {}

  async register() {
    try {
      let resp = await this.as.registerWithUsernameAndPassword(
        this.username,
        this.password
      );
      console.log(resp);
      // redirect
    } catch (error) {
      console.error(error);
    }
  }
}
