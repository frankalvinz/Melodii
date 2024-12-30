export interface Song {
  id: number;
  title: string;
  artist: string;
  duration: string;
  image: string;
  genre: string;
  releaseYear: number;
  description: string;
}

export interface Genre {
  id: number;
  name: string;
  songs: Song[];
}

export interface MusicResponse {
  genres: Genre[];
}