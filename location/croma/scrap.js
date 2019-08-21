const puppeteer = require('puppeteer');
const jsonfile = require('jsonfile');
const fs = require('fs');
var stringify = require('csv-stringify');
var vistedPages = [];
var pagesToVist = jsonfile.readFileSync('./city.json');
var data = [];
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
    lnk = lnk.other;
    if (!lnk.includes("javascript")) {
        await scrape(lnk);
        jsonfile.writeFile('./dataJson.json', data, { spaces: 2 }, function(err) {
            count++;
            console.error(err + ' ==' + count);

        });
    }


    scrapeF();
}
async function scrape(curlink) {
    let currlink = `https://www.croma.com/store?city=${curlink}&location=Please select`;

    console.log(currlink);

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 900 });
    await page.goto(currlink, { waitUntil: 'networkidle2', timeout: 0 });
    //var pic = "screenshots/shotP" + Date.now() + ".jpeg";
    // await page.screenshot({ path: pic, type: 'jpeg', fullPage: true });
    try {
        await page.waitForSelector('.storeloc#store option');
    } catch (ee) {

    }
    let tbleCont = await page.evaluate(() => {
        var arr = [];
        let tableHeader = document.querySelectorAll('.storeloc#store option');
        if (tableHeader) {
            tableHeader.forEach((tr, i) => {
                if (tr) {
                    let item = {};

                    item["other"] = tr.innerText;
                    if (tr.querySelector(".wpsl-direction-wrap")) {
                        item["dirrection"] = tr.querySelector(".wpsl-direction-wrap").innerText;
                    }
                    if (tr.querySelector(".wpsl-store-location")) {
                        item["location"] = tr.querySelector(".wpsl-store-location").innerText;
                    }
                    arr.push(`&location=${tr.getAttribute("value")}`);
                }

            });
        }
        return arr;
    });
    for (let i = 0; i < tbleCont.length; i++) {
        tbleCont[i] = `https://www.croma.com/store?city=${curlink}${tbleCont[i]}`;
    }
    console.log(tbleCont);
    data = data.concat(tbleCont);
    //await browser.close();


}
stst();