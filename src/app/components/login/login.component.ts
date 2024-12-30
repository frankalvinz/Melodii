import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [FormBuilder],
  template: `
    <div class="login-container">
      <div class="login-box">
        <!-- Logo -->
        <a routerLink="/home" class="logo">
          <img src="/assets/images/favicon.png" alt="Melodii Logo" class="logo-image" />
        </a>
        <!-- App Name -->
        <h1>Melodii</h1>
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
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
          <button type="submit" class="btn btn-primary" [disabled]="loginForm.invalid">
            Login
          </button>
        </form>
      </div>
      <!-- Signup Section -->
      <div class="signup-section">
        <p class="text-center">
          If you don't have an account, join us using the button below
        </p>
        <button class="btn btn-secondary w-100" (click)="navigateToSignup()">
          Sign Up
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
    .signup-section {
      text-align: center;
      width: 100%;
      max-width: 400px;
    }
    .signup-section p {
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
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(success => {
        if (success) {
          this.router.navigate(['/home']);
        } else {
          alert('Invalid credentials');
        }
      });
    }
  }

  navigateToSignup() {
    this.router.navigate(['/signup']);
  }
}
