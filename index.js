const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();

    const cy_id = "id";
    const cy_pw = "pw";

    await page.goto('https://cyphers.nexon.com/');

    await page.click('.chk_week');
    await page.waitForSelector('.log_info');
    await page.click('.log_info > a');
    await page.waitForSelector('.show');


    await page.evaluate((id, pw) => {
        document.querySelector('input[name=id]').value = id;
        document.querySelector('input[name=password]').value = pw;
    }, cy_id, cy_pw);

    await page.click('.lobtn');

    try{
        await page.waitForSelector('.pw_cpin', {timeout: 1000});
        await page.click('#passwordCp')
    }catch{

    }
    


    await page.goto('https://cyphers.nexon.com/mypage/account/info');
    await page.waitForSelector('.clan',{timeout: 1000 });

    const result = await page.evaluate(() => {
        const onlineClanText = document.querySelector('#wrap > section.content.mypage > div.mycount > ul.clan > li > p:nth-child(4)').innerText;
        return onlineClanText.replace('접속 중인 클랜원','').replace('\n','').split('/')[0].trim();
    });
    console.log(result);

    browser.close();
})();