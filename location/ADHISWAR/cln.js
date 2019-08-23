const jsonfile = require('jsonfile');
var stringify = require('csv-stringify');
const fs = require('fs');

var arr = [];
var data = jsonfile.readFileSync('./dataJson.json');
data.forEach(function(tt) {
    let phone = "";
    let zip = "";
    let lnd = "";
    str = tt["other"].trim().split("\n");
    if (tt["other"].toLowerCase().includes("ph.:")) {
        phone = str.pop().toLowerCase().split("ph.:")[1].trim();
    }
    if (tt["other"].toLowerCase().includes("@")) {
        str.pop();
    }
    if (str[str.length-1]) {
        var matches = str[str.length-1].trim().match(\s*(\d+)/);
        console.log(matches);
    }
    str = str.filter(word => word.trim());
    str.forEach(function(s) {
        if (s.toLowerCase().includes("near") || s.toLowerCase().includes("opp")) {
            lnd += " " + s;
        }
    });
    let item = {
        "BRANDS SOLD": "",
        "PRODUCT TYPES/ CATEGORIES": "TV",
        "RETAILER TYPE": "Consumer Electronics",
        "RETAILER_ID": "",
        "RETAILER NAME": "BAJAJ ELECTRONICS",
        "LOCATION NAME": tt["location"],
        "ADDRESS": tt["address"],
        "LAND MARK": lnd,
        "CITY": tt["city"],
        "DISTRICT": "",
        "STATE/PROVINCE": "KARNATAKA",
        "ZIP/POSTAL CODE": zip,
        "COUNTRY": "India",
        "CONTACT PHONE": tt["phone"],
        "CONTACT PERSON": "",
        "STORE SIZE": "",
        "GEO COORDINATES": "",
        "TIER LEVEL OF GOODS SOLD": "",
        "URL": "https://www.bajajelectronics.com/stores",
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

    arr.push(item);
});
saveCsv('BAJAJ ELECTRONICS-csv.csv', arr);
saveJson('ABAJAJ ELECTRONICS-json.json', arr);

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