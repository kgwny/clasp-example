declare let global: any;
declare let DriveApp: any;
declare let Utilities: any;
declare let SpreadsheetApp: any;
declare let GmailApp: any;

global.csv = (): void => {
  getNewestCsvFileFromMail();
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

export const getNewestCsvFileFromMail = (): void => {
  const threads = GmailApp.search(`subject:("report 2021-10")`);
  const messages = GmailApp.getMessagesForThreads(threads);

  let newestAttachment;
  let mailDate;
  for (let thread of messages) {
    for (let message of thread) {
      console.log(message.getDate());
      let attachments = message.getAttachments();
      for (let attachment of attachments) {
        if ((mailDate == null) || (mailDate < message.getDate())) {
          mailDate = message.getDate();
          console.log("★ " + mailDate);
          newestAttachment = attachment;
        }
      }
    }
  }

  const folder = DriveApp.getFolderById("1TxsLOcl99o8ULkdujrlPzkqgaO-HfUFx");
  folder.createFile(newestAttachment);

  // let fileNames = getFileNames();

  // for (let i in newestAttachment) {
  //   for (let j in fileNames) {
  //     // ドライブにすでに同じ名前のファイルがあるか？
  //     if (newestAttachment[i].getName() == fileNames[j]) {
  //       let files = DriveApp.getFilesByName(fileNames[j]);
  //       // 重複ファイルを削除
  //       if (files.hasNext()) {
  //         let file = files.next();
  //         file.setTrashed(true);
  //         console.log(file.getName());  // 削除したファイル名表示
  //       }
  //     }
  //   }
  //   // ドライブに添付ファイルを保存
  //   folder.createFile(newestAttachment[i]);
  // }

  const file = folder.getFilesByName("test2021-10.csv").next();
  console.log("file = " + file);

  const csvData = Utilities.parseCsv(file.getBlob().getDataAsString());
  console.log("csvData = " + csvData);

  const spreadSheet = SpreadsheetApp.openById("1gou2T0oSRV4Rt85fHpe-O7E2_6XRaOApZ1rILNZvIyE");
  const sheet = spreadSheet.getSheetByName("sheet1");
  sheet.getRange(1, 1, csvData.length, csvData[0].length).setValues(csvData);
}

// フォルダの中に入ってるファイルの名前を取得
export const getFileNames = (): any[] => {
  // 保存するフォルダ(Googledrive上のURL”folders/”以下)
  let files = DriveApp.getFolderById("1TxsLOcl99o8ULkdujrlPzkqgaO-HfUFx").getFiles();
  let fileNames = [];
  let count = 0;

  while (files.hasNext()) {
    fileNames[count] = files.next();
    count++;
  }

  console.log("fileNames = " + fileNames);
  return fileNames;
}

// フォルダにあるファイル名が添付ファイル名と同じとき更新
export const updateFile = (
  attachments: any
): void => {
  const folder = DriveApp.getFolderById("1TxsLOcl99o8ULkdujrlPzkqgaO-HfUFx");
  let fileNames = getFileNames();

  for (let i in attachments) {
    for (let j in fileNames) {
      // ドライブにすでに同じ名前のファイルがあるか？
      if (attachments[i].getName() == fileNames[j]) {
        let files = DriveApp.getFilesByName(fileNames[j]);
        // 重複ファイルを削除
        if (files.hasNext()) {
          let file = files.next();
          file.setTrashed(true);
          console.log(file.getName());  // 削除したファイル名表示
        }
      }
    }
    // ドライブに添付ファイルを保存
    folder.createFile(attachments[i]);
  }
}
