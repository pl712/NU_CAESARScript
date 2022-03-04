const puppeteer = require('puppeteer')

const netID = 'netid'
const password=  'pword'    //fill this in

const subject = 'subject'
const courseNUM = 'num'



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
    await page.waitForTimeout(1000);
    
    //why arent we using splinter
    //await page.select("#SSR_CLSRCH_WRK_SUBJECT_SRCH$0","COMP_ENG");
    await page.mouse.click(600,385);
     let subjecta = subject.split("")
        for (var i = 0; i< subjecta.length; i++) {
        await page.keyboard.press(subjecta.at(i));
    } 
    await page.keyboard.press('Enter');

    await page.mouse.click(850,400);
    let pgnum = courseNUM.split("");
        for (var i = 0; i<pgnum.length; i ++) {
            await page.keyboard.press(pgnum.at(i));
        }


    await page.mouse.click(600,450);

    await page.keyboard.press('Enter');
}   

launch()
