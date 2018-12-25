import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ConfigService } from '../services/config.service';
import { Config } from '../shared/config';

@Component({
  selector: 'app-raw',
  templateUrl: './raw.component.html',
  styleUrls: ['./raw.component.scss']
})
export class RawComponent implements OnInit {
  @Input() isUpdate: Subject<boolean>;
  config: Config;
  config$: Observable<Config>;
  channelLimit: Array<string>;

  constructor(private configService: ConfigService) { }

  ngOnInit() {
    this.config = this.configService.getConfig();
    this.channelLimit = this.config ? this.config.ChannelLimit.split(',') : [];

    this.config$ = this.isUpdate.pipe(switchMap(data => of(this.configService.getConfig())));
    this.config$.subscribe(config => {
      this.channelLimit = config.ChannelLimit.split(',');
      delete this.config;
    });
  }

}
