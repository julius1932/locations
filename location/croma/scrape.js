const puppeteer = require('puppeteer');
const jsonfile = require('jsonfile');
const fs = require('fs');
var stringify = require('csv-stringify');
var vistedPages = [];
var pagesToVist = jsonfile.readFileSync('./links.json');
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
    lnk = lnk.toLowerCase();
    if (!lnk.includes("please") && !lnk.includes("location=null")) {
        await scrape(lnk);
        jsonfile.writeFile('./dataJson.json', data, { spaces: 2 }, function(err) {
            count++;
            console.error(err + ' ==' + count);

        });
    }


    scrapeF();
}
async function scrape(currlink) {
    currlink = currlink.toLowerCase();
    let cityLoc=currlink.split("?")[1];
    let city=cityLoc.split("&")[0].split("city=").join("");
     let location=cityLoc.split("&")[1].split("location=").join("");
    console.log(currlink);

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 900 });
    await page.goto(currlink, { waitUntil: 'networkidle2', timeout: 0 });
    try {
        await page.waitForSelector('#budyisstoreiframe iframe');
    } catch (ee) {

    }

    let tbleCont = await page.evaluate((city,location) => {
        var arr = [];
        let tableHeader = document.querySelectorAll('#budyisstoreiframe iframe');
        if (tableHeader) {
            tableHeader.forEach((tr, i) => {
                if (tr) {
                    let item = {city:city,location:location};
                    item["url"] = tr.getAttribute("src");
                    arr.push(item);
                }

            });
        }
        return arr;
    },city,location);

    console.log(tbleCont);
    data = data.concat(tbleCont);
    await  page.close();


}
stst();