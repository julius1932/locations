const puppeteer = require('puppeteer');
const jsonfile = require('jsonfile');
const fs = require('fs');
var stringify = require('csv-stringify');
var vistedPages = [];
var pagesToVist = jsonfile.readFileSync('./dataJ.json');
var data = [];

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
    await scrape(lnk);
    await jsonfile.writeFileSync('./dataJson.json', data, { spaces: 2 });
    scrapeF();
}
async function scrape(currlink) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 900 });
    await page.goto(currlink.url, { waitUntil: 'networkidle2', timeout: 0 });
    try {
        await page.waitForSelector('#budyisstoreiframe iframe');
    } catch (ee) {

    }

    let tbleCont = await page.evaluate((currlink) => {
        let tableHeader = document.querySelector('.store_address');
        if (tableHeader) {
            currlink.ADDRESS = tableHeader.innerText;
        }
        return currlink;
    }, currlink);

    console.log(tbleCont);
    data.push(tbleCont);
    await page.close();


}
stst();