import { BehaviorSubject, merge } from 'rxjs';
import { filter, pairwise } from 'rxjs/operators';

import { Component, OnInit } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { select, Store } from '@ngrx/store';

import { selectRouteParams, selectUrl, State } from './reducers';
import { StationApiService } from './services/station-api/station-api.service';

const DEFAULT_TITLE = '読み込み中';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title$ = new BehaviorSubject<string>(DEFAULT_TITLE);
  public isHome$ = new BehaviorSubject<boolean>(true);

  private previousUrl: string;

  constructor(
    private store: Store<State>,
    private stationApiService: StationApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.recordPrevUrl();
    this.watchRouterState();
  }

  private recordPrevUrl() {
    this.router.events.pipe(filter(event => event instanceof RoutesRecognized))
    .pipe(pairwise())
    .subscribe((event: any[]) => {
      this.store.pipe(select(selectRouteParams)).subscribe(state => {
        // 駅情報ページ
        if (state.group_id) {
          this.previousUrl = '/';
          return;
        }
        this.previousUrl  = event[0].urlAfterRedirects;
      });
    });
  }

  private watchRouterState() {
    merge(
      this.store.pipe(select(selectUrl)),
      this.store.pipe(select(selectRouteParams))
    )
      .pipe(filter(o => !!o))
      .subscribe(state => {
        this.title$.next(DEFAULT_TITLE);
        if (state === '/' || !Object.keys(state).length) {
          this.title$.next('最寄り駅');
          this.isHome$.next(true);
          return;
        }
        if (typeof state === 'object' && state.group_id) {
          this.isHome$.next(false);
          this.stationApiService
            .fetchStationByGroupId(state.group_id)
            .subscribe(station => {
              this.title$.next(`${station.name}駅の路線`);
            });
        }
        if (typeof state === 'object' && state.line_id) {
          this.isHome$.next(false);
          this.stationApiService
            .fetchLineByLineId(state.line_id)
            .subscribe(line => {
              this.title$.next(line.name);
            });
        }
      });
  }

  public backToPrevPage() {
    if (!this.previousUrl) {
      this.router.navigate(['/']);
      return;
    }
    this.router.navigate([this.previousUrl]);
  }
}
