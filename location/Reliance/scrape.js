const puppeteer = require('puppeteer');
const jsonfile = require('jsonfile');
const fs = require('fs');
var stringify = require('csv-stringify');

var indiaTowns = jsonfile.readFileSync('./cities.json');
indiaTowns = Object.keys(indiaTowns);
var data = [];
var pagesToVist = Object.keys(data);
var vistedPages = [];
var pagesToVist = ["https://www.reliancedigital.in/locateus"];

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
    let states = indiaTowns;
    console.log(states);
    for (let i = 0; i < states.length; i++) {
        var bb = "";
        await page.$eval('input.geosuggest__input', (el, value) => el.value = value, bb);
        await page.waitFor(2000);
        await page.type('input.geosuggest__input', states[i]);
        await page.waitFor(4000);
        try {
            await page.click(`li.geosuggest__item:nth-of-type(1)`);
        } catch (ee) {

        }
        await page.waitFor(4000);
        let cities = await page.evaluate(() => {
            var arr = [];
            let tableHeader = document.querySelectorAll('.sl__storeTextLoop__blockLoop');
            if (tableHeader) {
                tableHeader.forEach((tr, i) => {
                    if (tr) {
                        if (tr.innerText) {
                            arr.push(tr.innerText);
                        }

                    }
                });
            }
            return arr;
        });
        await page.$eval('input.geosuggest__input', (el, value) => el.value = value, bb);
        data = data.concat(cities);
        console.log(cities);
        jsonfile.writeFileSync('./dataJson.json', data, { spaces: 2 });

    }


    //await browser.close();


}
stst();