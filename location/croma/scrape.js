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

    console.log(currlink);

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 900 });
    await page.goto(currlink, { waitUntil: 'networkidle2', timeout: 0 });
    try {
        await page.waitForSelector('div#main_wrapper div.wrapper');
    } catch (ee) {

    }


    let tbleCont = await page.evaluate(() => {
        var arr = [];
        /* item.title = document.querySelector(".ctl_aboutbrand h1").innerText;
         item.brand = document.querySelector(".brandlname").innerText;
         item.price = document.querySelector(".sp_amt").innerText;
         item.category = "TV";
         item["Retailer Name"] = "Adhiswar India Limited";*/

        let tableHeader = document.querySelectorAll('div#main_wrapper div.wrapper');

        if (tableHeader) {
            tableHeader.forEach((tr, i) => {
                if (tr) {
                    let item = {};
                    item["other"] = tr.innerText;
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