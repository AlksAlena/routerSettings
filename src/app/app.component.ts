import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  isChanged: Subject<boolean> = new Subject();

  constructor() { }

  ngOnInit() { }

  onChanged() {
    this.isChanged.next(true);
  }
}
