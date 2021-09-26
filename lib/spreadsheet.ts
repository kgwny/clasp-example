declare let DriveApp: any;
declare let Utilities: any;
declare let SpreadsheetApp: any;

export const importCsvFromGoogleDrive = (
  fileName: string
): void => {
  var file = DriveApp.getFilesByName(fileName).next();
  var csvData = Utilities.parseCsv(file.getBlob().getDataAsString());
  var sheet = SpreadsheetApp.getActiveSheet();
  sheet.getRange(1, 1, csvData.length, csvData[0].length).setValues(csvData);
}
  