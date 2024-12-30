import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="login-container">
      <div class="login-box">
        <!-- Logo -->
        <a routerLink="/home" class="logo">
          <img src="/assets/images/favicon.png" alt="Melodii Logo" class="logo-image" />
        </a>
        <!-- App Name -->
        <h1>Sign Up for Melodii</h1>
        <form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <input 
              type="text" 
              formControlName="firstName" 
              placeholder="First Name"
              class="form-control"
            >
          </div>
          <div class="form-group">
            <input 
              type="text" 
              formControlName="lastName" 
              placeholder="Last Name"
              class="form-control"
            >
          </div>
          <div class="form-group">
            <input 
              type="email" 
              formControlName="email" 
              placeholder="Email"
              class="form-control"
            >
          </div>
          <div class="form-group">
            <input 
              type="password" 
              formControlName="password" 
              placeholder="Password"
              class="form-control"
            >
          </div>
          <button type="submit" class="btn btn-primary" [disabled]="signupForm.invalid">
            Sign Up
          </button>
        </form>
      </div>
      <div class="login-section">
        <p class="text-center">
          Already have an account? 
        </p>
        <button class="btn btn-secondary w-100" (click)="navigateToLogin()">
          Login
        </button>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: linear-gradient(to bottom right, #1DB954, #191414);
    }
    .login-box {
      background: #282828;
      padding: 40px;
      border-radius: 8px;
      width: 100%;
      max-width: 400px;
      margin-bottom: 20px;
    }
    h1 {
      text-align: center;
      margin-bottom: 30px;
      color: #fff;
    }
    .form-group {
      margin-bottom: 20px;
    }
    .form-control {
      width: 100%;
      padding: 12px;
      border: none;
      border-radius: 4px;
      background: #3E3E3E;
      color: white;
    }
    .form-control:focus {
      outline: none;
      box-shadow: 0 0 0 2px #1DB954;
    }
    .btn-primary {
      background: #1DB954;
      color: #fff;
      border: none;
      padding: 10px;
      border-radius: 4px;
      cursor: pointer;
    }
    .btn-primary:hover {
      background: #14863c;
    }
    .login-section {
      text-align: center;
      width: 100%;
      max-width: 400px;
    }
    .text-center {
      text-align: center;
      margin-top: 10px;
      color: #b3b3b3;
    }
    .text-green {
      color: #1DB954;
      text-decoration: none;
    }
    .text-green:hover {
      text-decoration: underline;
    }
    .btn-secondary {
      background: #1DB954;
      color: #fff;
      border: none;
      padding: 10px;
      border-radius: 4px;
      cursor: pointer;
    }
    .btn-secondary:hover {
      background: #14863c;
    }
    .login-section {
      text-align: center;
      width: 100%;
      max-width: 400px;
    }
    .login-section p {
      color: #b3b3b3;
      margin-bottom: 10px;
    }
    .w-100 {
      width: 100%;
    }
    .logo {
      color: #fff;
      text-decoration: none;
      font-size: 24px;
      font-weight: bold;
      display: flex;
      justify-content: center;
      margin-bottom: 10px;
    }
    .logo-image {
      width: 40px;
      margin-right: 8px;
    }
  `]
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.authService.signup(this.signupForm.value).subscribe(success => {
        if (success) {
          this.router.navigate(['/home']);
        }
      });
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}