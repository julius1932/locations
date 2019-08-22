const puppeteer = require('puppeteer');
const jsonfile = require('jsonfile');
const fs = require('fs');
var stringify = require('csv-stringify');

//var data = jsonfile.readFileSync('./dataJson.json');
var data = [];
var pagesToVist = Object.keys(data);
var vistedPages = [];
var pagesToVist = ["https://adityavision.in/store-network/"];

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

    let states = await page.evaluate(() => {
        var arr = [];
        let tableHeader = document.querySelectorAll('select.form-control option');
        if (tableHeader) {
            tableHeader.forEach((tr, i) => {
                if (tr.getAttribute("value")) {
                    arr.push(tr.getAttribute("value"));
                }
            });
        }
        return arr;
    });
    console.log(states);
    for (let i = 0; i < states.length; i++) {
        await page.select('select[name="stores_in_patna"]', states[i]);
        await page.waitForSelector('.aditbox');
        let tbleCont = await page.evaluate(() => {
            var arr = [];

            let city = document.querySelector('.topSb strong').innerText;
            let tableHeader = document.querySelectorAll('.aditbox');

            if (tableHeader) {
                tableHeader.forEach((tr, i) => {
                    if (tr) {
                        let item = {};

                        item["other"] = tr.innerText;
                        item["city"] = city;
                        /*if (tr.querySelector(".wpsl-direction-wrap")) {
                            item["dirrection"] = tr.querySelector(".wpsl-direction-wrap").innerText;
                        }
                        if (tr.querySelector(".wpsl-store-location")) {
                             item["location"] = tr.querySelector(".wpsl-store-location").innerText;
                        }*/
                        arr.push(item);
                    }

                });
            }
            return arr;
        });
        console.log(tbleCont);
        data = data.concat(tbleCont);
    }

    //await browser.close();


}
stst();