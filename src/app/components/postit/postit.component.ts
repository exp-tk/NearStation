import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-postit',
  templateUrl: './postit.component.html',
  styleUrls: ['./postit.component.scss']
})
export class PostitComponent implements OnInit {
  @Input() class?: string;
  @Input() labelColor: string;
  @Input() labelText?: string;
  @Input() tips: HTMLElement;

  constructor() { }

  ngOnInit() {
  }

  public get classes() {
    return this.class ? `${this.class} postit` : 'postit';
  }

  public get labelStyle() {
    return {
      background: this.labelColor ? `#${this.labelColor}` : '#333',
      padding: this.labelText ? '0 8px' : 0
    };
  }

}
