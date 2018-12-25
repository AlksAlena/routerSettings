import { Injectable } from '@angular/core';
import { Config } from '../shared/config';
import { RANGE_CHANNEL_LIMITS, AVAILABLE_CHANNEL_BONDINGS } from '../shared/ranges';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  getConfig(): Config {
    let routerConfig: Config = {
      'SSID': '',
      'WPAKey': '',
      'ChannelBonding': 0,
      'ExtendedChannel': false,
      'UseChannelLimit': false,
      'ChannelLimit': ''
    };
    let lastRouterConfig: Config = this.downloadFromLocalStorage("router_config");
    if (lastRouterConfig) {
      for (let prop in lastRouterConfig) {
        routerConfig[prop] = lastRouterConfig[prop];
      }
    } else {
      this.uploadToLocalStorage("router_config", routerConfig);
    }
    return routerConfig;
  }

  getAvailableChannelBonding(): Array<number> {
    return AVAILABLE_CHANNEL_BONDINGS;
  }

  getAvailableChannelLimit(config: Config): Array<number> {
    let bond: number = config.ChannelBonding;
    let extend: boolean = config.ExtendedChannel;
    let result: Array<number>;
    if (bond != 5 && bond != 10) {
      result = RANGE_CHANNEL_LIMITS[`limitBond_${bond}_${extend}`];
    } else {
      result = RANGE_CHANNEL_LIMITS[`limitBond_${bond}`];
    }
    return result;
  }

  setConfig(config: Config): void {
    this.uploadToLocalStorage("router_config", config);
  }

  private downloadFromLocalStorage(key: string): Config {
    let value = JSON.parse(localStorage.getItem(key));
    return value;
  }

  private uploadToLocalStorage(key: string, value: any): void {
    let serialValue = JSON.stringify(value);
    localStorage.setItem(key, serialValue);
  }
}
