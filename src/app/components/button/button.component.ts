import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() color?: string;
  @Input() class?: string;

  constructor() {}

  ngOnInit() {}

  public get style() {
    return {
      background: this.color ? this.color : '#008ffe'
    };
  }

  public get classes() {
    return this.class ? `${this.class} button` : 'button';
  }
}
