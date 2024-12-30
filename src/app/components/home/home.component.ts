import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MusicService } from '../../services/music.service';
import { NavComponent } from '../nav/nav.component';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, RouterModule, NavComponent],
    template: `
    <app-nav></app-nav>
    <div class="container">
      <header>
        <h1>Welcome to Melodii</h1>
      </header>
      
      <main>
        <div *ngFor="let genre of genres" class="genre-section">
          <h2>{{ genre.name }}</h2>
          <div class="songs-grid">
            <div *ngFor="let song of genre.songs" class="card" [routerLink]="['/song', song.id]">
              <img [src]="song.image" [alt]="song.title" class="song-image">
              <h3>{{ song.title }}</h3>
              <p>{{ song.artist }}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  `,
    styles: [`
    header {
      padding: 40px 0;
    }
    .song-image {
      width: 100%;
      aspect-ratio: 1;
      object-fit: cover;
      border-radius: 4px;
      margin-bottom: 12px;
    }
    h2 {
      margin-bottom: 20px;
    }
    h3 {
      font-size: 16px;
      margin-bottom: 4px;
    }
    p {
      color: #b3b3b3;
      font-size: 14px;
    }
  `]
})
export class HomeComponent implements OnInit {
  genres: any[] = [];

  constructor(private musicService: MusicService) {}

  ngOnInit() {
    this.musicService.getAllMusic().subscribe(data => {
      this.genres = data.genres;
    });
  }
}