import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MusicService } from '../../services/music.service';
import { NavComponent } from '../nav/nav.component';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-song-details',
    standalone: true,
    imports: [CommonModule, NavComponent],
    template: `
    <app-nav></app-nav>
    <div class="container" *ngIf="song">
      <div class="song-details">
        <img [src]="song.image" [alt]="song.title" class="song-cover">
        <div class="song-info">
          <h1>{{ song.title }}</h1>
          <h2>{{ song.artist }}</h2>
          <p class="genre">{{ song.genre }}</p>
          <p class="duration">Duration: {{ song.duration }}</p>
          <p class="year">Released: {{ song.releaseYear }}</p>
          <p class="description">{{ song.description }}</p>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .song-details {
      display: grid;
      grid-template-columns: 300px 1fr;
      gap: 40px;
      padding: 40px 0;
    }
    .song-cover {
      width: 100%;
      aspect-ratio: 1;
      object-fit: cover;
      border-radius: 8px;
    }
    .song-info h1 {
      font-size: 48px;
      margin-bottom: 8px;
    }
    .song-info h2 {
      font-size: 24px;
      color: #b3b3b3;
      margin-bottom: 24px;
    }
    .song-info p {
      margin-bottom: 12px;
    }
    .song-info .description {
      margin-top: 24px;
      line-height: 1.6;
    }
  `]
})
export class SongDetailsComponent implements OnInit {
  song: any;

  constructor(
    private route: ActivatedRoute,
    private musicService: MusicService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.musicService.getSongById(id).subscribe(song => {
        this.song = song;
      });
    });
  }
}