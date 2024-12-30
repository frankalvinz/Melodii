import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiService } from '../api/api.service';
import { Song, MusicResponse } from './music.types';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  constructor(private api: ApiService) {}

  getAllMusic() {
    return this.api.get<MusicResponse>('assets/data/music.json');
  }

  getSongById(id: number): Observable<Song | null> {
    return this.api.get<MusicResponse>('assets/data/music.json').pipe(
      map(data => {
        for (const genre of data.genres) {
          const song = genre.songs.find(s => s.id === id);
          if (song) return song;
        }
        return null;
      })
    );
  }
}