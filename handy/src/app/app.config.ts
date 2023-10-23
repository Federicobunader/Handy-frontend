import { Injectable } from '@angular/core';

/**
 * Global variable containing actual environment variables to use.
 */
export let APP_CONFIG: any = {};

/**
 * AppConfigService is responsible for setting environment variables to APP_CONFIG. This app uses this approach for Docker over angular-cli environment approach
 * @link https://stackoverflow.com/questions/41035581/loading-configuration-from-database-before-angular-2-app-start-using-aot
 * @link https://stackoverflow.com/questions/49559009/angular5-deploying-angular-application-to-multiple-clients/49559443#49559443
 */
@Injectable()
export class AppConfig {
  /**
   * Service constructor
   */
  constructor() {}

  /**
   * Sets given config object to APP_CONFIG constant
   * @param config
   */
  public set(config: any): void {
    APP_CONFIG = Object.assign(config);
  }

  public getConfig(key: string): any {
    return APP_CONFIG[key];
  }
}
