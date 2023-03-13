import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { SpotifyService } from '../spotify.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css'],
})
export class AlbumComponent implements OnInit {
  album: any = {};
  tracks: any = [];

  routeObs!: Observable<ParamMap>;

  constructor(
    private route: ActivatedRoute,
    private service: SpotifyService
  ) {}

  ngOnInit(): void {
    this.routeObs = this.route.paramMap;
    this.routeObs.subscribe(this.getRouterParam);
  }

  getRouterParam = (params: ParamMap) => {
    let albumId = params.get('id') || '';
    this.service.getAlbum(albumId).subscribe((album: any) => {
      this.album = album;
      this.tracks = album.tracks.items.map((t: any) => {return {id: t.id, name: t.name}})
    });
  };
}
