const jsonfile = require('jsonfile');
var stringify = require('csv-stringify');
const fs = require('fs');

var arr = [];
var data = jsonfile.readFileSync('./dataJson.json');
data.forEach(function(tt) {
    var item = {
        "BRANDS SOLD": "",
        "PRODUCT TYPES/ CATEGORIES": "TV",
        "RETAILER TYPE": "Consumer Electronics",
        "RETAILER_ID": "",
        "RETAILER NAME": "GREAT EASTERN",
        "LOCATION NAME": "",
        "ADDRESS": "",
        "LAND MARK": "",
        "CITY": "",
        "DISTRICT": "",
        "STATE/PROVINCE": "",
        "ZIP/POSTAL CODE": "",
        "COUNTRY": "",
        "CONTACT PHONE": "",
        "STORE SIZE": "",
        "GEO COORDINATES": "",
        "TIER LEVEL OF GOODS SOLD": "",
        "URL": "",
        "NUMBER OF STORES/BRANCHIES IN THE CHAIN": "",
        "HQ ADDRESS": "",
        "HOLDING COMPANY NAME": "",
        "HOLDING COMPANY ADDRESS": "",
        "HOLDINGS CONTACT": "",
        "URL (HOLDING COMAPANY)": "",
        "MANUFACTURER / FACTORY": "",
        "MANUFACTURER ADDRESS": "",
        "MANUFACTURER CONTACT": ""
    };
    let other = tt["other"].split("\n");
    item["CITY"] = tt["city"];
    item["DISTRICT"] = other[0];
    item["URL"] = tt["url"];
    for (let i = 1; i < other.length; i++) {
        item["ADDRESS"] += " " + other[i];
        if (other[i].toLowerCase().includes("near") || other[i].toLowerCase().includes("opposite")) {
            item["LAND MARK"] = other[i];
        }
    }
    arr.push(item);
});
saveCsv('GREAT EASTERN-csv.csv', arr);
saveJson('GREAT EASTERN-json.json', arr);

function saveCsv(folder, allDetails) {
    stringify(allDetails, { header: true }, function(err, output) {
        fs.writeFile(folder, output, 'utf8', function(err) {
            if (err) {
                console.log('Some error occured - file either not saved or corrupted file saved.');
            } else {
                console.log('It\'s saved!');
            }
        });
    });
}

function saveJson(folder, finalArray) {
    jsonfile.writeFile(folder, finalArray, { spaces: 2 }, function(err) {
        console.error(err)
    });
}