declare let SpreadsheetApp: any;

export function copyStr() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const val = sheet.getRange("A1:A1").getValues();
  sheet.getRange("A2:A2").setValue(val);
}
  