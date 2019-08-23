const puppeteer = require('puppeteer');
const jsonfile = require('jsonfile');
const fs = require('fs');
var stringify = require('csv-stringify');

var indiaTowns = jsonfile.readFileSync('./cities.json');
indiaTowns = Object.keys(indiaTowns);
var data = [];
var pagesToVist = Object.keys(data);
var vistedPages = [];
var pagesToVist = ["https://www.sbicard.com/sbi-card-en/assets/docs/html/personal/offers/reliance-digital-list.html"];

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


    await page.waitFor(4000);
    let cities = await page.evaluate(() => {
        var arr = [];
        let tableHeader = document.querySelectorAll('.tablemain .tabledata tbody tr');
        if (tableHeader) {
            tableHeader.forEach((tr, i) => {
                var item = {};
                if (tr) {
                    if (tr.innerText) {
                        item["Merchant Name"] = tr.querySelector('td:nth-of-type(1)').innerText;
                        item["City"] = tr.querySelector('td:nth-of-type(2)').innerText;
                        item["Pincode"] = tr.querySelector('td:nth-of-type(3)').innerText;
                        item["address"] = tr.querySelector('td:nth-of-type(4)').innerText + "\n";
                        item["address"] += tr.querySelector('td:nth-of-type(5)').innerText;
                        arr.push(item);
                    }

                }
            });
        }
        return arr;
    });
    
    data = data.concat(cities);
    console.log(cities);
    jsonfile.writeFileSync('./dataJson.json', data, { spaces: 2 });

}


//await browser.close();



stst();