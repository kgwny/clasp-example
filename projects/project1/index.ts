import { SheetService } from '../../lib/sheet.service';

declare let global: any;

global.createNewFile = (): void => {

  const hoge = new Promise((resolve) => {
    const resolveValue = 'resolved1';
    console.log(`promise1 = ${resolveValue}`);
    resolve(resolveValue);
  });

  hoge
    .catch((error) => {
      console.log('catch1 : ' + error);
      return Promise.reject('CATCH1');
    })
    .then((success) => {
      console.log('then : ' + success);
      return 'THEN';
    })
    .catch((error) => {
      console.log('catch2 : ' + error);
      throw 'CATCH2';
    })
    .catch((error) => {
      console.log('catch3 : ' + error);
    });

  const test = new Promise((resolve) => {
    const resolveValue = 'resolved2';
    setTimeout(() => {
      console.log(`promise2 = ${resolveValue}`);
    }, 1000);
    resolve(resolveValue);
  });

  test.then((result) => {
    console.log(`${result}`);
  });

  asyncTest();

  (async () => {
    console.log(await hidouki('test1'));
    console.log(douki('test2'));
  })();

  // スプレッドシートの処理
  const ss = SheetService.createInitialFile('New file');
  ss.getRange('A3').setValue('hoge');
};

/**
 * 注意：GASではsetTimeoutが動作しない
 * 待機させたいときは、同期処理のUtilities.sleepを使用すること
 */

const promiseTest = (res: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('promiseTest');
      resolve(`promise ${res}`);
      reject('Error');
    }, 1000);
  });
};

const asyncTest = async () => {
  try {
    const intentionalErr = 1;
    console.log('asyncTest1');
    console.log(await promiseTest(1));
    console.log('asyncTest2');
    console.log(await promiseTest(2));
  } catch (err) {
    console.log('err');
  }
};

const hidouki = (hoge: string) => {
  return Promise.resolve(hoge);
};

const douki = (piyo: string) => {
  return piyo;
};
