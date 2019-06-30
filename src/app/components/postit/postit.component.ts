import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-postit',
  templateUrl: './postit.component.html',
  styleUrls: ['./postit.component.scss']
})
export class PostitComponent implements OnInit {
  @Input() class?: string;
  @Input() color: string;

  constructor() { }

  ngOnInit() {
  }

  public get classes() {
    return this.class ? `${this.class} postit` : 'postit';
  }

  public get labelStyle() {
    return {
      background: this.color ? `#${this.color}` : '#333'
    };
  }

}
