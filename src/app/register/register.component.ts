import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import Validation from '../utils/validation';
import { AuthService } from '../services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    RouterLink,
    ReactiveFormsModule,
    CommonModule,
    MatIconModule,
    MatProgressBarModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  isFirstNameFocused = false;
  isLastNameFocused = false;
  isUsernameFocused = false;
  isEmailFocused = false;
  isPasswordFocused = false;
  isConfirmPasswordFocused = false;
  errorMessage: string = '';
  loading: boolean = false;

  registerForm: FormGroup | undefined;
  form: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });
  submitted = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.form = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20),
          ],
        ],
        email: [
          '',
          [
            Validators.required,
            Validators.pattern(
              '^[A-Za-z0-9._%+-]+@[A-Za-z0-9._%+-]{2,}[.][A-Za-z]{2,}$'
            ),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: [Validation.match('password', 'confirmPassword')],
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.errorMessage = '';

    if (this.form.invalid) {
      return;
    }
    this.userRegister();
  }

  async userRegister() {
    try {
      await this.authService.registerWithUsernameAndPassword(
        this.form.value.firstName,
        this.form.value.lastName,
        this.form.value.username,
        this.form.value.email,
        this.form.value.password
      );
      this.loading = false;
    } catch (error) {
      console.error(error);
      this.errorMessage = 'Enter a valid email address';
      this.loading = false;
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

  onPasswordFocus() {
    this.isPasswordFocused = true;
  }

  onPasswordBlur() {
    this.isPasswordFocused = false;
  }

  onConfirmPasswordFocus() {
    this.isConfirmPasswordFocused = true;
  }

  onConfirmPasswordBlur() {
    this.isConfirmPasswordFocused = false;
  }
}
