import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dot',
  templateUrl: './dot.component.html',
  styleUrls: ['./dot.component.scss']
})
export class DotComponent implements OnInit {
  @Input() color: string;
  @Input() class?: string;

  constructor() { }

  ngOnInit() {
  }

  public get style() {
    return {
      background: this.color
    };
  }

  public get classes() {
    return this.class ? `${this.class} dot` : 'dot';
  }
}
