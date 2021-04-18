export const getDayFormat = (date = new Date()): string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month}-${day}`;
};

//列番号のアルファベット列名変換
// function wmap_column_convert(colmun_number) {
//   var sheet = SpreadsheetApp.getActiveSheet();
//   var result = sheet.getRange(1, colmun_number);
//   result = result.getA1Notation();
//   result = result.replace(/\d/,'');
//   return result;
// }
