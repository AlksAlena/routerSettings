import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ConfigService } from '../services/config.service';
import { Config } from '../shared/config';

@Component({
  selector: 'app-web',
  templateUrl: './web.component.html',
  styleUrls: ['./web.component.scss']
})
export class WebComponent implements OnInit {
  @Output() onChanged: EventEmitter<boolean> = new EventEmitter();
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
    this.availableChannelLimit = this.tmpConfig ? this.setAvailableRange(this.tmpConfig) : [];
    this.channelLimit = this.tmpConfig ?
                        this.tmpConfig.ChannelLimit.split(',').map(item => parseInt(item, 10)) : [];
  }

  setAvailableRange(value): Array<number> {
    return this.configService.getAvailableChannelLimit(this.tmpConfig);
  }

  getAvailableRange(value): void {
    this.availableChannelLimit = this.configService.getAvailableChannelLimit(this.tmpConfig);
  }

  validationForm(config: Config): boolean {
    if (!config.SSID) return false;
    if (!config.WPAKey) return false;
    else if (config.WPAKey.length < 8 || config.WPAKey.length > 63) return false;
    return true;
  }

  onSubmit() {
    this.isSubmitForm = true;
    setTimeout(() => this.isSubmitForm = false, 500);
    this.isValidForm = this.validationForm(this.tmpConfig);
    this.tmpConfig.ChannelLimit = this.channelLimit.toString();
    if (this.isValidForm) {
      this.configService.setConfig(this.tmpConfig);
      this.onChanged.emit(null);
    } else return;
  }

}
