var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');
var jsonfile = require('jsonfile');

var START_URL = 'https://www.bismigroup.com/branch/';

var pagesVisited = {};
var numPagesVisited = 0;
var pagesToVisit = [START_URL];

var pagesUrls = [];
var numItems = 0;
var  allLinks=[];
const urll = new URL(START_URL);
const baseUrl = urll.protocol + "//" + urll.hostname;



function crawl() {
    if (pagesToVisit.length <= 0) {
        console.log(`visited all pages. ${numItems} items scraped and saved`);

        return;
    }
    var nextPage = pagesToVisit.shift();
    console.log(`<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>> left with ${pagesToVisit.length} pages to visit`)
    if (nextPage in pagesVisited) {
        // We've already visited this page, so repeat the crawl
        crawl();
    } else {
        // New page we haven't visited
        if (nextPage == null) {
            return;
        }
        numPagesVisited++;
        visitPage(nextPage, crawl);
    }
}

function requestPage(url, callback) {
    var agent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36';
    var options = {
        url: url,
        headers: {
            'User-Agent': agent
        }
    };

    return new Promise(function(resolve, reject) {
        // Do async job
        request.get(options, function(err, resp, body) {
            if (err) {
                reject(err);
                callback();
            } else {
                resolve(body);
            }
        })
    })
}

function visitPage(url, callback) {
    // Add page to our set
    pagesVisited[url] = true;
    // Make the request
    console.log("Visiting page " + url);
    var requestPag = requestPage(url, callback);
    requestPag.then(function(body) {
        var $ = cheerio.load(body);
        collectLinks($);
        //scrapeItem($,url);
        callback();
    }, function(err) {
        console.log(err);
        callback();
    })
}
// google.search
function collectLinks($) {
    console.log(` ====  collecting Links`);
    
    var count = 0;
    $(".store-itm a.img-wrap").each(function() {
        var link = $(this).attr('href');
        if (link != "#") {
            if (link.startsWith("/")) {
                link = baseUrl + link;
            }
            if (link in pagesVisited) {} else {
                if (link in  allLinks) {} else {
                   
                    allLinks.push(link);
                }
            }
        }
    });
    saveJson("links.json", allLinks);
}

 

function saveJson(name,data) {
    jsonfile.writeFile(name, data, { spaces: 2 }, function(err) {
        console.error(err)
    });
}
crawl();