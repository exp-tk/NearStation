import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Station } from '../../models/StationAPI';

@Component({
  selector: 'app-station-panel',
  templateUrl: './station-panel.component.html',
  styleUrls: ['./station-panel.component.scss']
})
export class StationPanelComponent implements OnInit {
  @Input() station: Station;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public toLinePage(groupId: number) {
    this.router.navigate([`/station/${groupId}/lines`]);
  }
}
