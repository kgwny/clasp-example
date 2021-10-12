declare let global: any;
declare let DriveApp: any;
declare let Utilities: any;
declare let SpreadsheetApp: any;
declare let GmailApp: any;

global.csv = (): void => {
  getCsvFileFromMail();
}

export const getCsvFile = (): void => {
  const folder = DriveApp.getFolderById("1TxsLOcl99o8ULkdujrlPzkqgaO-HfUFx");
  const file = folder.getFilesByName("test.csv").next();
  console.log("file = " + file);

  const csvData = Utilities.parseCsv(file.getBlob().getDataAsString());
  console.log("csvData = " + csvData);

  const spreadSheet = SpreadsheetApp.openById("1gou2T0oSRV4Rt85fHpe-O7E2_6XRaOApZ1rILNZvIyE");
  const sheet = spreadSheet.getSheetByName("sheet1");
  sheet.getRange(1, 1, csvData.length, csvData[0].length).setValues(csvData);
}

export const getCsvFileFromMail = (): void => {
  const threads = GmailApp.search(`subject:("report 2021-10")`);
  const messages = GmailApp.getMessagesForThreads(threads);

  let lastAttachment;
  let mailDate;
  for (let thread of messages) {
    for (let message of thread) {
      console.log(message.getDate());
      let attachments = message.getAttachments();
      for (let attachment of attachments) {
        if ((mailDate == null) || (mailDate < message.getDate())) {
          mailDate = message.getDate();
          console.log("★ " + mailDate);
          lastAttachment = attachment;
        }
      }
    }
  }

  const folder = DriveApp.getFolderById("1TxsLOcl99o8ULkdujrlPzkqgaO-HfUFx");
  folder.createFile(lastAttachment);

  const file = folder.getFilesByName("test2021-10.csv").next();
  console.log("file = " + file);

  const csvData = Utilities.parseCsv(file.getBlob().getDataAsString());
  console.log("csvData = " + csvData);

  const spreadSheet = SpreadsheetApp.openById("1gou2T0oSRV4Rt85fHpe-O7E2_6XRaOApZ1rILNZvIyE");
  const sheet = spreadSheet.getSheetByName("sheet1");
  sheet.getRange(1, 1, csvData.length, csvData[0].length).setValues(csvData);
}
