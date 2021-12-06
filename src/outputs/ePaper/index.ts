import puppeteer from 'puppeteer';

import configJson from './config.json';

const config = configJson as { ip: [number, number, number, number] };

const outputToEPaper = async (width: number, height: number, url: string) => {
  const browser = await puppeteer.launch({
    headless: true,
  });

  const uploadPage = await browser.newPage();
  await uploadPage.goto(`http://${url}`);
  await uploadPage.waitForSelector('label.menu_button[for=_1]');
  const generateBtn = await uploadPage.$('label.menu_button[for=_1]');
  const widthInput = await uploadPage.$('#nud_w');
  const heightInput = await uploadPage.$('#nud_h');
  const uploadBtn = await uploadPage.waitForSelector(
    'label.menu_button[for=_5]'
  );
  const frontPage = await browser.newPage();
  frontPage.setViewport({
    width,
    height,
    deviceScaleFactor: 1,
  });
  setInterval(async () => {
    await frontPage.goto('https://time.is/zh/');
    const screenshotBase64 =
      'data:img/jpg;base64,' +
      (await frontPage.screenshot({
        type: 'jpeg',
        quality: 100,
        encoding: 'base64',
      }));
    await uploadPage.bringToFront();
    if (widthInput && heightInput) {
      await uploadPage.evaluate(`
      base64ConvertFile = function (urlData, filename) { // 64转file
          if (typeof urlData != 'string') {
            this.$toast("urlData不是字符串")
            return;
          }
          var arr = urlData.split(',')
          var type = arr[0].match(/:(.*?);/)[1]
          var fileExt = type.split('/')[1]
          var bstr = atob(arr[1])
          var n = bstr.length
          var u8arr = new Uint8Array(n)
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          return new File([u8arr], 'filename.' + fileExt, {
            type: type
          });
        }
        file = base64ConvertFile('${screenshotBase64}', 'image');
        processFiles([file]);
        document.getElementById('nud_w').value = '';
        document.getElementById('nud_h').value = '';
      `);
      if (generateBtn && uploadBtn) {
        uploadPage.on('requestfailed', (req) => {
          if (req.url().includes('LOAD_')) {
            console.log('load+1');
          }
        });
        await uploadPage.tap('input[type=radio][value=m22]');
        await generateBtn.click();
        await uploadBtn.click();
      } else {
        console.error('========error');
      }
      await uploadPage.waitForRequest(`http://${url}/SHOW_`);
      console.log('show on e-paper');
    }
  }, 15000);
};

outputToEPaper(800, 480, config.ip.join('.'));
