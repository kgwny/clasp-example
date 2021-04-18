import * as log from '../../lib/log';

declare let global: any;
declare let Logger: any;
declare let Utilities: any;

global.main = (): void => {
  Logger.log("start");
  let sleepTimeMs = 500;
  Utilities.sleep(sleepTimeMs);
  log.log();
  Logger.log("end");
}
