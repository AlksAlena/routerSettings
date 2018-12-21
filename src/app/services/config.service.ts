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

  getAvailableChannelBonding(): Array<number> {
    return AVAILABLE_CHANNEL_BONDINGS;
  }

  getAvailableChannelLimit(config: Config): Array<number> {
    let bond = config.ChannelBonding;
    let extend = config.ExtendedChannel;
    let result;
    if (bond != 5 && bond != 10) {
      result = RANGE_CHANNEL_LIMITS[`limitBond_${bond}_${extend}`];
    } else {
      result = RANGE_CHANNEL_LIMITS[`limitBond_${bond}`];
    }
    return result;
  }

  validationForm(config: Config): boolean {
    if (!config.SSID) return false;
    if (config.WPAKey) {
      if (config.WPAKey.length < 8 || config.WPAKey.length > 63) return false;
    }
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
