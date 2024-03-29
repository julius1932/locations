const puppeteer = require('puppeteer');
const jsonfile = require('jsonfile');
const fs = require('fs');
var stringify = require('csv-stringify');

//var data = jsonfile.readFileSync('./dataJson.json');
var data = [];
var pagesToVist = Object.keys(data);
var vistedPages = [];
var pagesToVist = ["https://www.giriasindia.com/index.php/storelocator/","https://www.giriasindia.com/index.php/storelocator/?p=2"];

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

    await page.waitForSelector('#stores-list-div table#stores tbody tr td.stores-view table#stores-inner tbody tr td.stores-name');
    

    let tbleCont = await page.evaluate(() => {
        var arr = [];
        /* item.title = document.querySelector(".ctl_aboutbrand h1").innerText;
         item.brand = document.querySelector(".brandlname").innerText;
         item.price = document.querySelector(".sp_amt").innerText;
         item.category = "TV";
         item["Retailer Name"] = "Adhiswar India Limited";*/

        let tableHeader = document.querySelectorAll('#stores-list-div table#stores tbody tr td.stores-view table#stores-inner tbody');

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