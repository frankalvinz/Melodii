import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { NavComponent } from '../nav/nav.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavComponent],
  template: `
  <app-nav></app-nav>
    <div class="container">
      <div class="profile-box">
        <h1>Profile</h1>
        <form [formGroup]="profileForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label>First Name</label>
            <input 
              type="text" 
              formControlName="firstName" 
              class="form-control"
            >
          </div>
          <div class="form-group">
            <label>Last Name</label>
            <input 
              type="text" 
              formControlName="lastName" 
              class="form-control"
            >
          </div>
          <div class="form-group">
            <label>Email</label>
            <input 
              type="email" 
              formControlName="email" 
              class="form-control"
            >
          </div>
          <div class="buttons">
            <button type="submit" class="btn btn-primary" [disabled]="profileForm.invalid">
              Save Changes
            </button>
            <button type="button" class="btn btn-secondary" (click)="logout()">
              Logout
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 40px;
    }
    .profile-box {
      background: #282828;
      padding: 40px;
      border-radius: 8px;
      max-width: 600px;
      margin: 0 auto;
    }
    h1 {
      margin-bottom: 30px;
      color: #fff;
    }
    .form-group {
      margin-bottom: 20px;
    }
    label {
      display: block;
      margin-bottom: 8px;
      color: #b3b3b3;
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
    .buttons {
      display: flex;
      gap: 16px;
      margin-top: 24px;
    }
    .btn-secondary {
      background: #3E3E3E;
    }
  `]
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
    this.authService.currentUser.subscribe(user => {
      if (user) {
        this.profileForm.patchValue({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        });
      }
    });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      this.authService.updateProfile(this.profileForm.value).subscribe(
        (success) => {
          if (success) {
            alert('Profile updated successfully');
            this.router.navigate(['/home']);
          } else {
            alert('Profile update failed');
          }
        },
        (error) => {
          alert('An error occurred during profile update');
          console.error('An error occurred during profile update', error);
        }
      );
    }
  }
  

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}