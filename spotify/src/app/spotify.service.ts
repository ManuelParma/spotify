import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  token: string = environment.TOKEN;

  constructor(private http: HttpClient) {}

  searchTrack(query: string) {
    const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    let obsTracks = this.http.get(url, { headers });
    return obsTracks;
  }

  getTrack(trackId: string) {
    const url = `https://api.spotify.com/v1/tracks/${trackId}`;

    return this.getReq(url);
  }

  getArtist(artistId: string) {
    const url = `https://api.spotify.com/v1/artists/${artistId}`;
    return this.getReq(url);
  }

  getReq(url: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.get(url, { headers });
  }

  getAlbum(albumId: string) {
    const url = `https://api.spotify.com/v1/albums/${albumId}`;
    return this.getReq(url);
  }

  getArtistAlbums(artistId: string) {
    const url = `https://api.spotify.com/v1/artists/${artistId}/albums`;
    return this.getReq(url);
  }

}
