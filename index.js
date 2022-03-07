const puppeteer = require('puppeteer')

const netID = 'username'
const password=  'password'    //fill this in

const subject = 'ELEC_ENG'
const courseNUM = '327'

//const browser = await puppeteer.launch({headless: false})

// const browser = await puppeteer.launch({
// args: [
//     '--window-size=1920,1080'
// ],
// });
async function launch() {
    const browser = await puppeteer.launch({
        headless:false,
        args: [
            '--window-size=1920,1080',],
        });
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
    
    //Loop inserts here
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

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var monitors = [];
function loop(monitors) {
    var length = monitors.length
    //launch
    while (true) {
        for (var j = 0; j<length; j++) {
            //navigate
            //check class status
        } 
        sleep(120-length);
    }
}
