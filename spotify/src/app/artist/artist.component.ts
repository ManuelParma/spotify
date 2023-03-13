import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SpotifyService } from '../spotify.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent {

  routeObs!: Observable<ParamMap>; 

  artist: any;
  albums: any = [];

  constructor(
    private route: ActivatedRoute,
    private service: SpotifyService,
    private location: Location) { }


  ngOnInit(): void {
    this.routeObs = this.route.paramMap;
    this.routeObs.subscribe(this.getRouterParam);
  }

  getRouterParam = (params: ParamMap) => {
    let artistId = params.get('id') || "";
    this.service.getArtist(artistId).subscribe(artist => {
      this.artist = artist;
    });
    this.service.getArtistAlbums(artistId).subscribe((albums: any) => {
      this.albums = albums.items.map((a: any) => {return {id: a.id, name: a.name}});
    })
  }

  back() {
    this.location.back();
  }

}
