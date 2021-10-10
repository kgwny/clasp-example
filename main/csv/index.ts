declare let global: any;
declare let DriveApp: any;
declare let Utilities: any;
declare let SpreadsheetApp: any;

global.csv = (): void => {
  const folder = DriveApp.getFolderById("1TxsLOcl99o8ULkdujrlPzkqgaO-HfUFx");
  const file = folder.getFilesByName("test.csv").next();
  console.log("file = " + file);

  const csvData = Utilities.parseCsv(file.getBlob().getDataAsString());
  console.log("csvData = " + csvData);

  const spreadSheet = SpreadsheetApp.openById("1gou2T0oSRV4Rt85fHpe-O7E2_6XRaOApZ1rILNZvIyE");
  const sheet = spreadSheet.getSheetByName("sheet1");
  sheet.getRange(1, 1, csvData.length, csvData[0].length).setValues(csvData);
}
