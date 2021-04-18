import { getDayFormat } from './util';

declare let SpreadsheetApp: any;

export class SheetService {
  static createInitialFile(prefix: string): any {
    const fileName = `${prefix} ${getDayFormat()}`;
    const ss = SpreadsheetApp.create(fileName);
    const range = ss.getRange('A1');
    range.setValue('Hello, clasp!');
    return ss;
  }
}
