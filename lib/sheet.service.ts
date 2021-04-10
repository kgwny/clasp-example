import { getDayFormat } from './util';

declare var SpreadsheetApp;

export class SheetService {
  static createInitialFile(prefix: string): SpreadsheetApp {
    const fileName = `${prefix} ${getDayFormat()}`;
    const ss = SpreadsheetApp.create(fileName);
    const range = ss.getRange('A1');
    range.setValue('Hello, clasp!');
    return ss;
  }
}
