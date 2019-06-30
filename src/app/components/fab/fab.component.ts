import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-fab',
  templateUrl: './fab.component.html',
  styleUrls: ['./fab.component.scss']
})
export class FABComponent implements OnInit {
  @Input() icon: string;
  @Input() color: string;

  constructor() {}

  ngOnInit() {}

  public get style() {
    return {
      background: this.color ? this.color : '#008ffe'
    };
  }
}
