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
  availableChannelBonding: Array<number>;
  availableChannelLimit: Array<number> = [];
  channelLimit: Array<number>;
  isSubmitForm: boolean = false;
  isValidForm: boolean = true;

  constructor(private configService: ConfigService) { }

  ngOnInit() {
    this.tmpConfig = this.configService.getConfig();
    this.availableChannelBonding = this.configService.getAvailableChannelBonding();
    this.availableChannelLimit = this.tmpConfig.ChannelBonding ? this.setAvailableRange(this.tmpConfig) : [];
    this.channelLimit = this.tmpConfig.ChannelLimit ? 
                        this.tmpConfig.ChannelLimit.split(',').map(item => parseInt(item, 10)) : [];
  }

  setAvailableRange(value): Array<number> {
    return this.configService.getAvailableChannelLimit(this.tmpConfig);
  }

  getAvailableRange(value): void {
    this.channelLimit = [];
    this.availableChannelLimit = this.configService.getAvailableChannelLimit(this.tmpConfig);
  }

  onSubmit() {
    this.isSubmitForm = true;
    setTimeout(() => this.isSubmitForm = false, 500);
    this.isValidForm = this.configService.validationForm(this.tmpConfig);
    this.tmpConfig.ChannelLimit = this.channelLimit.toString();
    if (this.isValidForm) {
      this.configService.setConfig(this.tmpConfig);
    } else return;    
  }
}
