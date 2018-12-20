import { Injectable } from '@angular/core';
import { Config } from '../shared/config';
import { RANGE_CHANNEL_LIMITS, AVAILABLE_CHANNEL_BONDINGS } from '../shared/ranges';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  getConfig(): Config {
    let routerConfig = {
        'SSID': '',
        'WPAKey': '',
        'ChannelBonding': 0,
        'ExtendedChannel': false,
        'UseChannelLimit': false,
        'ChannelLimit': ''
      };
    let lastRouterConfig = this.downloadFromLocalStorage("router_config");
    if (lastRouterConfig) {
      for (let prop in lastRouterConfig) {
        routerConfig[prop] = lastRouterConfig[prop];
      }
    } else {
      this.uploadToLocalStorage("router_config", routerConfig);
    }
    return routerConfig;
  }

  getAvailableChannelBonding() {
    return AVAILABLE_CHANNEL_BONDINGS;
  }

  isValidForm(config: Config): boolean {
    let ranges: Array<number> = RANGE_CHANNEL_LIMITS[`limitBond${config.ChannelBonding}`];
    console.log(`ranges for bond: ${config.ChannelBonding}`);
    console.log('ranges: ', ranges);
    return true;
  }

  setConfig(config: Config): void {
    this.uploadToLocalStorage("router_config", config);
  }

  private downloadFromLocalStorage(key: string): object {
    let value = JSON.parse(localStorage.getItem(key));
    return value;
  }

  private uploadToLocalStorage(key: string, value: any): void {
    let serialValue = JSON.stringify(value);
    localStorage.setItem(key, serialValue);
  }
}
