import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SpotifyService } from '../spotify.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {

  routeObs!: Observable<ParamMap>; 

  track : any;

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private service: SpotifyService,
    private location: Location) { }


  ngOnInit(): void {
    this.routeObs = this.route.paramMap;
    this.routeObs.subscribe(this.getRouterParam);
  }

  getRouterParam = (params: ParamMap) => {
    let trackId = params.get('id') || "";
    this.service.getTrack(trackId).subscribe(track => {
      this.track = track;
    });
  }

  back() {
    this.location.back();
  }
}
