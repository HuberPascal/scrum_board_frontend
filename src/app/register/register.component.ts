import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatInputModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  firstName: string = '';
  lastName: string = '';
  username: string = '';
  email: string = '';
  password1: string = '';
  password2: string = '';
  isFirstNameFocused = false;
  isLastNameFocused = false;
  isUsernameFocused = false;
  isEmailFocused = false;
  isPasswordFocused1 = false;
  isPasswordFocused2 = false;

  constructor(private authService: AuthService) {}

  async register() {
    try {
      let response = await this.authService.registerWithUsernameAndPassword(
        this.firstName,
        this.lastName,
        this.username,
        this.email,
        this.password1
      );
      console.log(response);
      // redirect
    } catch (error) {
      console.error(error);
    }
  }

  onFirstNameFocus() {
    this.isFirstNameFocused = true;
  }

  onFirstNameBlur() {
    this.isFirstNameFocused = false;
  }

  onLastNameFocus() {
    this.isLastNameFocused = true;
  }

  onLastNameBlur() {
    this.isLastNameFocused = false;
  }

  onUsernameFocus() {
    this.isUsernameFocused = true;
  }

  onUsernameBlur() {
    this.isUsernameFocused = false;
  }

  onEmailFocus() {
    this.isEmailFocused = true;
  }

  onEmailBlur() {
    this.isEmailFocused = false;
  }

  onPasswordFocus1() {
    this.isPasswordFocused1 = true;
  }

  onPasswordBlur1() {
    this.isPasswordFocused1 = false;
  }

  onPasswordFocus2() {
    this.isPasswordFocused2 = true;
  }

  onPasswordBlur2() {
    this.isPasswordFocused2 = false;
  }
}
