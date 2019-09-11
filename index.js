const puppeteer = require('puppeteer');

(async() => {
    try {
        const browser = await puppeteer.launch({
            headless: false
        });
    
        const page = await browser.newPage();
        await page.goto('https://www.pcoptimum.ca/login', {waitUntil: 'networkidle2'});
        await page.waitFor('input[name=email]');
        await page.type('input[name=email]', 'xxx@opentrash.com', {delay: 20})
        await page.type('input[name=password]', 'xxx', {delay: 20})

        await Promise.all([
            page.click('button[type="submit"]'),
            page.waitForNavigation({ waitUntil: 'networkidle0' }),
        ]);
        await page.screenshot({path: 'login.png'});

        browser.close();
    } catch (err) {
        console.error(err);
        return process.exit(1);
    }
})();