const puppeteer = require('puppeteer')

const netID = 'daddyfrank'
const password=  ''    //fill this in

const subject = 'COMP_SCI'
const courseNUM = '212'

var page

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function launch() {
    
    const browser = await puppeteer.launch({headless: false})
    page = await browser.newPage()
    await page.setViewport( { 'width' : 1600, 'height' : 1024 } );
    
    await page.goto("https://caesar.ent.northwestern.edu/")
    await page.waitForNavigation();

    await page.waitForSelector('#loginButton_0');

    await page.type('#idToken1', netID);
    await page.type('#idToken2', password);

    await page.click('#loginButton_0')

    await page.waitForSelector('#trust-browser-button');
    await page.click('#trust-browser-button');

    const chooseCourse = await page.waitForXPath('/html/body/form/div[2]/div[4]/div[2]/div/div/div/div/div[3]/section/div/div[3]/div/div[1]/div[2]/div/div[2]/div/div/div/div[8]/div[1]/div');
    await chooseCourse.click();
    await page.waitForTimeout(1000);

}   

async function cycle(classSubj, classNum) {
    await page.reload();

    const chooseClass = await page.waitForXPath('/html/body/form/div[2]/div[4]/div[1]/div/div[2]/div[1]/div/div/div/div[2]/div[2]/div/div[2]/div/ul/li[3]/div[2]/div');
    await page.waitForTimeout(1000);
    await chooseClass.click();
    
    const frameHandle = await page.$("iframe[id='main_target_win0']");
    const frame = await frameHandle.contentFrame();

    const subjectSelector = await frame.waitForXPath('/html/body/form/div[5]/table/tbody/tr/td/div/table/tbody/tr[4]/td[2]/div/table/tbody/tr[2]/td/table/tbody/tr[3]/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td[2]/div/table/tbody/tr/td/table/tbody/tr[3]/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td[2]/div/select')
    await subjectSelector.select(classSubj);

    const courseNum = await frame.waitForXPath('/html/body/form/div[5]/table/tbody/tr/td/div/table/tbody/tr[4]/td[2]/div/table/tbody/tr[2]/td/table/tbody/tr[3]/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td[2]/div/table/tbody/tr/td/table/tbody/tr[3]/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td[2]/div/table/tbody/tr/td/table/tbody/tr[4]/td[4]/div/input')
    await courseNum.type(classNum);

    const existCheck = await frame.waitForXPath('/html/body/form/div[5]/table/tbody/tr/td/div/table/tbody/tr[4]/td[2]/div/table/tbody/tr[2]/td/table/tbody/tr[3]/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td[2]/div/table/tbody/tr/td/table/tbody/tr[3]/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td[2]/div/table/tbody/tr/td/table/tbody/tr[8]/td[3]/div/input[2]')
    await existCheck.click();

    const searchBtn = await frame.waitForXPath('/html/body/form/div[5]/table/tbody/tr/td/div/table/tbody/tr[4]/td[2]/div/table/tbody/tr[2]/td/table/tbody/tr[5]/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td[3]/div/a/span/input')
    await searchBtn.click();
    
    const searchResult = await page.$("iframe[id='main_target_win0']");
    const searchTable = await searchResult.contentFrame();
    
    const result = await searchTable.waitForXPath('/html/body/form/div[5]/table/tbody/tr/td/div/table/tbody/tr[12]/td[2]/div/table'); //The result table
}

var classList = [
    {Subject: "COMP_SCI", Number: "214"}
];

function loop(monitors) {
    var length = monitors.length

    launch()
    
    while (true) {
        for (var j = 0; j<length; j++) {
            cycle(monitors[j].Subject, monitors[j].Number);
            sleep(120-length);
            //console.log("Looped")
            //if (parsefindtru){
            //    notify user
            //    break loop
            //}
        } 
        
    }
}

loop(classList);
