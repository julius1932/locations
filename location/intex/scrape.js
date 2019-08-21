const puppeteer = require('puppeteer');
const jsonfile = require('jsonfile');
const fs = require('fs');
var stringify = require('csv-stringify');

var data = jsonfile.readFileSync('./dataJson.json');
data = [];
var pagesToVist = Object.keys(data);
var vistedPages = [];
var pagesToVist = ["https://www.intex.in/store-locator"];

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
        await page.waitForSelector('select#state', { timeout: 40000 });
        //await page.click('div.product-tags :nth-child(2) a');
    } catch (err) {

    }
    let states = await page.evaluate(() => {
        var arr = [];
        let tableHeader = document.querySelectorAll('select#state option');
        if (tableHeader) {
            tableHeader.forEach((tr, i) => {
                if (tr) {
                    arr.push(tr.getAttribute("value"));
                }
            });
        }
        return arr;
    });
    for (let i = 0; i < states.length; i++) {
        await page.select('select[name="state"]', states[i]);
        await page.waitForSelector('select#city', { timeout: 40000 });
        await page.waitFor(4000);
        let cities = await page.evaluate(() => {
            var arr = [];
            let tableHeader = document.querySelectorAll('select#city option');
            if (tableHeader) {
                tableHeader.forEach((tr, i) => {
                    if (tr) {
                        if(tr.getAttribute("value")){
                            arr.push(tr.getAttribute("value"));
                        }
                        
                    }
                });
            }
            return arr;
        });
        console.log(cities);
        for (let k = 0; k < cities.length; k++) {
            await page.select('select[name="city"]', cities[k]);
           await page.waitFor(4000);
            let adresses = await page.evaluate(() => {
                var arr = [];
                let tableHeader = document.querySelectorAll('.store-location .address-box');
                if (tableHeader) {
                    tableHeader.forEach((tr, i) => {
                        if (tr) {
                            var item = { other: tr.innerText }
                            arr.push(item);
                        }
                    });
                }
                return arr;
            });
            data = data.concat(adresses);
            console.log(adresses);

        }
    }


    //await browser.close();


}
stst();