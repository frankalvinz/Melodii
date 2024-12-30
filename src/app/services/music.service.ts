import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  constructor(private http: HttpClient) {}

  getAllMusic() {
    return this.http.get<any>('assets/data/music.json');
  }

  getSongById(id: number): Observable<any> {
    return this.http.get<any>('assets/data/music.json').pipe(
      map((data: any) => {
        for (const genre of data.genres) {
          const song = genre.songs.find((s: any) => s.id === id);
          if (song) return song;
        }
        return null;
      })
    );
  }
}