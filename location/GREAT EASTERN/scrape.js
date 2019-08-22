const puppeteer = require('puppeteer');
const jsonfile = require('jsonfile');
const fs = require('fs');
var stringify = require('csv-stringify');

//var data = jsonfile.readFileSync('./dataJson.json');
var data = [];
var pagesToVist = Object.keys(data);
var vistedPages = [];
var pagesToVist = ["http://www.greateastern.co.in/westbengal-store.html",
    "http://www.greateastern.co.in/odishl-store.html",
    "http://www.greateastern.co.in/rajasthan-store.html",
    "http://www.greateastern.co.in/up-store.html",
    "http://www.greateastern.co.in/ap-store.html"
];

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
        await page.waitForSelector('.ex1 .col-sm-6 .new-map-text', { timeout: 1000 });
        //await page.click('div.product-tags :nth-child(2) a');
    } catch (err) {

    }
    let tbleCont = await page.evaluate((currlink) => {
        var arr = [];
        /* item.title = document.querySelector(".ctl_aboutbrand h1").innerText;
         item.brand = document.querySelector(".brandlname").innerText;
         item.price = document.querySelector(".sp_amt").innerText;
         item.category = "TV";
         item["Retailer Name"] = "Adhiswar India Limited";*/

        //div.google-maps-link href split ?ll &
        let tableHeader = document.querySelectorAll('.ex1 .col-sm-6');
        let city = document.querySelector('.container .inner-heading').innerText;
        if (tableHeader) {
            tableHeader.forEach((tr, i) => {
                if (tr) {
                    let item = {};
                    item.city=city;
                    item.url=currlink;
                    if (tr.querySelector('.new-map-text')) {
                       item["other"] = tr.querySelector('.new-map-text').innerText; 
                    }
                    
                    if (tr.querySelector('div.google-maps-link a')) {
                        let hf = tr.querySelector('div.google-maps-link a').getAttribute("href");
                        hf = hf.split("?ll")[1].split("&")[0];
                        item["ll"] = hf;
                    }
                    arr.push(item);
                }

            });
        }
        return arr;
    },currlink);

    console.log(tbleCont);
    data = data.concat(tbleCont);
    //await browser.close();


}
stst();