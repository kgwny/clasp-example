import * as log from '../../lib/log';

declare let global: any;

global.main = (): void => {
  log.log();
}
