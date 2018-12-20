import { Component, OnInit } from '@angular/core';
import { ConfigService } from './services/config.service';

import { Config } from './shared/config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit { 
  tmpConfig: Config;
  availableChannelBonding: Array<number> = [];
  availableChannelLimit: Array<number> = [31, 61, 158];
  channelLimit: Array<number>;

  constructor(private configService: ConfigService) {

  }

  ngOnInit() {
    this.tmpConfig = this.configService.getConfig();
    this.availableChannelBonding = this.configService.getAvailableChannelBonding();
    this.channelLimit = this.tmpConfig.ChannelLimit ? 
                        this.tmpConfig.ChannelLimit.split(',').map(item => parseInt(item, 10)) : [];
  }

  onSubmit() {
    this.tmpConfig.ChannelLimit = this.channelLimit.toString();
    if (this.configService.isValidForm(this.tmpConfig)) {
      this.configService.setConfig(this.tmpConfig);
    }    
  }
}
