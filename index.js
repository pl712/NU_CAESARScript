const puppeteer = require('puppeteer')

const netID: ''       //fill this in
const password: ''    //fill this in

const subject = 'COMP_SCI'
const courseNUM = '214'

async function launch() {
    const browser = await puppeteer.launch({headless: false})
    const page = await browser.newPage()
    await page.setViewport( { 'width' : 1600, 'height' : 1024 } );
    const addr = "https://caesar.ent.northwestern.edu/"
    await page.goto(addr)
    await page.waitForNavigation();

    await page.waitForSelector('#loginButton_0');

    await page.type('#idToken1', netID);
    await page.type('#idToken2', password);

    await page.click('#loginButton_0')

    await page.waitForSelector('#trust-browser-button');
    await page.click('#trust-browser-button');

    const chooseCourse = await page.waitForXPath('/html/body/form/div[2]/div[4]/div[2]/div/div/div/div/div[3]/section/div/div[3]/div/div[1]/div[2]/div/div[2]/div/div/div/div[8]/div[1]/div');
    await chooseCourse.click();

    await page.waitForNavigation();

    const chooseClass = await page.waitForXPath('/html/body/form/div[2]/div[4]/div[1]/div/div[2]/div[1]/div/div/div/div[2]/div[2]/div/div[2]/div/ul/li[3]/div[2]/div');
    await page.waitForTimeout(500);
    chooseClass.click();
    await page.waitForTimeout(500);

    //A bug here - can't seem to find that element for some reason to select for a subject
    const selectElem = await page.$('select[name="SSR_CLSRCH_WRK_SUBJECT_SRCH$0"]');
    await selectElem.type("COMP_SCI");
}

launch()
