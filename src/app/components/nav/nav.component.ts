import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="nav">
      <!-- Logo -->
      <a routerLink="/home" class="logo">
        <img src="/assets/images/favicon.png" alt="Melodii Logo" class="logo-image" />
      </a>
      <a routerLink="/profile" class="profile-link">
        <!-- Profile icon -->
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      </a>
    </nav>
  `,
  styles: [`
    .nav {
      background: #282828;
      padding: 16px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .logo {
      color: #fff;
      text-decoration: none;
      font-size: 24px;
      font-weight: bold;
      display: flex;
      align-items: center;
    }
    .logo-image {
      width: 30px;
      margin-right: 8px;
    }
    .profile-link {
      color: #fff;
      padding: 8px;
      border-radius: 50%;
      transition: background-color 0.2s;
    }
    .profile-link:hover {
      background: #3E3E3E;
    }
  `]
})
export class NavComponent {}
