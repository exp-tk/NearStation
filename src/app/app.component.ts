import { merge } from 'rxjs';
import { filter, pairwise } from 'rxjs/operators';

import { Component, OnInit } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
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
  public title = DEFAULT_TITLE;
  public isHome = true;

  private previousUrl: string;

  constructor(
    private store: Store<State>,
    private stationApiService: StationApiService,
    private router: Router,
    private updates: SwUpdate
  ) {}

  ngOnInit() {
    this.checkUpdate();
    this.recordPrevUrl();
    this.watchRouterState();
  }

  private checkUpdate() {
    this.updates.available.subscribe(() => {
      const prompt = window.confirm(
        'アップデートがあります。今すぐ更新しますか？'
      );
      if (prompt) {
        this.updates.activateUpdate().then(() => document.location.reload());
      }
    });
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
        this.title = DEFAULT_TITLE;
        if (state === '/' || !Object.keys(state).length) {
          this.title = '最寄り駅';
          this.isHome = true;
          return;
        }
        if (typeof state === 'object' && state.group_id) {
          this.isHome = false;
          this.stationApiService
            .fetchStationByGroupId(state.group_id)
            .subscribe(station => {
              this.title = `${station.name}駅`;
            });
        }
        if (typeof state === 'object' && state.line_id) {
          this.isHome = false;
          this.stationApiService
            .fetchLineByLineId(state.line_id)
            .subscribe(line => {
              this.title = line.name;
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
