const puppeteer = require('puppeteer');
const jsonfile = require('jsonfile');
const fs = require('fs');
var stringify = require('csv-stringify');

//var data = jsonfile.readFileSync('./dataJson.json');
var data = [];
var pagesToVist = Object.keys(data);
var vistedPages = [];
var pagesToVist = ["https://www.mylloyd.com/store-locator"];

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
    await page.waitForSelector('div.store-list.storemap .store-row.submit');
    let tbleCont = await page.evaluate(() => {
        var arr = [];
        

        let tableHeader = document.querySelectorAll('div.store-list.storemap .store-row.submit');

        if (tableHeader) {
            tableHeader.forEach((tr, i) => {
                if (tr) {
                    let item = {};
                    item["title"] = tr.querySelector(".title").innerText;
                    item["other"] = tr.innerText;
                    if (tr.querySelector(".store-address")) {
                        item["address"] = tr.querySelector(".store-address").innerText;
                    }
                    if (tr.querySelector(".store-phone")) {
                        item["phone"] = tr.querySelector(".store-phone").innerText;
                    }
                    arr.push(item);
                }

            });
        }
        return arr;
    });

    console.log(tbleCont);
    data = data.concat(tbleCont);
    //await browser.close();


}
stst();