const jsonfile = require('jsonfile');
var stringify = require('csv-stringify');
const fs = require('fs');

var arr = [];
var data = jsonfile.readFileSync('./dataJson.json');
data.forEach(function(tt) {
    let str = tt["address"].trim(" ").split(" ");
    let zip = str.pop();
    str=str.join(" ").trim();
    str=str.split("-").join(" ").trim();
    str=str.split(".").join(" ").trim();
    str = str.split("\n");
    str = str.pop();
    str = str.split(",");
    let city = str[0] || "";
    let dist = str[1] || "";
    let item = {
        "BRANDS SOLD": "",
        "PRODUCT TYPES/ CATEGORIES": "TV",
        "RETAILER TYPE": "Consumer Electronics",
        "RETAILER_ID": "",
        "RETAILER NAME": "PAI INTERNATIONAL",
        "LOCATION NAME": tt["location"],
        "ADDRESS": tt["address"],
        "LAND MARK": "",
        "CITY": city,
        "DISTRICT": dist,
        "STATE/PROVINCE": "",
        "ZIP/POSTAL CODE": zip,
        "COUNTRY": "India",
        "CONTACT PHONE": "",
        "CONTACT PERSON": "",
        "STORE SIZE": "",
        "GEO COORDINATES": "",
        "TIER LEVEL OF GOODS SOLD": "",
        "URL": "https://www.paiinternational.in/Stores",
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
saveCsv('PAI INTERNATIONAL-csv.csv', arr);
saveJson('PAI INTERNATIONAL-json.json', arr);

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