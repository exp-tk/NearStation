import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss']
})
export class LineComponent implements OnInit {

  @Input() color: string;
  @Input() classes: string;

  constructor() { }

  ngOnInit() {
    if (this.color === '') {
      this.color = '#aaa';
    }
    if (!this.color.startsWith('#')) {
      this.color = '#' + this.color;
    }
  }

}
