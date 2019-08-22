const puppeteer = require('puppeteer');
const jsonfile = require('jsonfile');
const fs = require('fs');
var stringify = require('csv-stringify');

var data; // = jsonfile.readFileSync('./dataJson.json');
data = [];
var pagesToVist = Object.keys(data);
var vistedPages = [];
var pagesToVist = ["https://www.vijaysales.com/store-locator"];

//console.log(arr.length);
var count = 0;
var browser;
async function stst() {
    browser = await puppeteer.launch({ headless: false });
    await scrapeF();
}
async function scrapeF() {
    console.log(pagesToVist.length + " pages left");
    if (pagesToVist.length == 0) {
        browser.close();
        return;
    }

    var lnk = pagesToVist.pop();
    if (!lnk.includes("javascript")) {
        await scrape(lnk);
        jsonfile.writeFile('./dataJson.json', data, { spaces: 2 }, function(err) {
            count++;
            console.error(err + ' ==' + count);

        });
    }


    scrapeF();
}
async function scrape(currlink) {
    console.log(currlink);

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 900 });
    await page.goto(currlink, { waitUntil: 'networkidle2', timeout: 0 });
    //var pic = "screenshots/shotP" + Date.now() + ".jpeg";
    // await page.screenshot({ path: pic, type: 'jpeg', fullPage: true });
    try {
        await page.waitForSelector('.dvSortOptions .dvSortOption', { timeout: 40000 });
        //await page.click('div.product-tags :nth-child(2) a');
    } catch (err) {

    }
    let states = await page.evaluate(() => {
        var arr = [];
        let tableHeader = document.querySelectorAll('.dvSortOptions .dvSortOption');
        if (tableHeader) {
            tableHeader.forEach((tr, i) => {
                if (tr) {
                    arr.push({ key: tr.getAttribute("data-value"), value: tr.innerText.trim() });
                }
            });
        }
        return arr;
    });

    console.log(states);
    for (let k = 0; k < states.length; k++) {
        let state = states[k].value;
        await page.click(`.dvSortBox`);
        await page.click(`.dvSortOptions .dvSortOption:nth-of-type(${1+k})`);
        await page.waitFor(4000);
        let adresses = await page.evaluate((state) => {
            var arr = [];
            let tableHeader = document.querySelectorAll('.dv-location');
            if (tableHeader) {
                tableHeader.forEach((tr, i) => {
                    if (tr) {
                        var item = {
                            state: state,
                            DISTRICT: tr.querySelector('.location-head').innerText,
                            ADDRESS: tr.querySelector('.location-text-content').innerText,
                            CONTACT: tr.querySelector('.lnkStpB4Unload').innerText,
                            other: tr.innerText
                        };
                        arr.push(item);
                    }
                });
            }
            return arr;
        }, state);
        data = data.concat(adresses);
        console.log(adresses.length);

    }
    //await browser.close();


}
stst();