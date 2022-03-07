const puppeteer = require('puppeteer')

const netID = 'plm7912'
const password=  ''    //fill this in

const subject = 'COMP_SCI'
const courseNUM = '212'

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
    await page.waitForTimeout(500);

    const chooseClass = await page.waitForXPath('/html/body/form/div[2]/div[4]/div[1]/div/div[2]/div[1]/div/div/div/div[2]/div[2]/div/div[2]/div/ul/li[3]/div[2]/div');
    await page.waitForTimeout(500);
    await chooseClass.click();
    
    const frameHandle = await page.$("iframe[id='main_target_win0']");
    const frame = await frameHandle.contentFrame();

    const subjectSelector = await frame.waitForXPath('/html/body/form/div[5]/table/tbody/tr/td/div/table/tbody/tr[4]/td[2]/div/table/tbody/tr[2]/td/table/tbody/tr[3]/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td[2]/div/table/tbody/tr/td/table/tbody/tr[3]/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td[2]/div/select')
    await subjectSelector.select(subject);

    const courseNum = await frame.waitForXPath('/html/body/form/div[5]/table/tbody/tr/td/div/table/tbody/tr[4]/td[2]/div/table/tbody/tr[2]/td/table/tbody/tr[3]/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td[2]/div/table/tbody/tr/td/table/tbody/tr[3]/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td[2]/div/table/tbody/tr/td/table/tbody/tr[4]/td[4]/div/input')
    await courseNum.type(courseNUM);

    const existCheck = await frame.waitForXPath('/html/body/form/div[5]/table/tbody/tr/td/div/table/tbody/tr[4]/td[2]/div/table/tbody/tr[2]/td/table/tbody/tr[3]/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td[2]/div/table/tbody/tr/td/table/tbody/tr[3]/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td[2]/div/table/tbody/tr/td/table/tbody/tr[8]/td[3]/div/input[2]')
    await existCheck.click();

    const searchBtn = await frame.waitForXPath('/html/body/form/div[5]/table/tbody/tr/td/div/table/tbody/tr[4]/td[2]/div/table/tbody/tr[2]/td/table/tbody/tr[5]/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td[3]/div/a/span/input')
    await searchBtn.click();
}   

launch()
