const jsonfile = require('jsonfile');
var stringify = require('csv-stringify');
const fs = require('fs');

var arr = [];
var data = jsonfile.readFileSync('./dataJson.json');
data.forEach(function(tt) {
    let str = tt.other.split("\n");
    let item = {
        "BRANDS SOLD": "MICROMAX",
        "PRODUCT TYPES/ CATEGORIES": "TV",
        "RETAILER TYPE": "Consumer Electronics",
        "RETAILER_ID": "",
        "RETAILER NAME": "",
        "LOCATION NAME": str[0],
        "ADDRESS": str[1],
        "LAND MARK": "",
        "CITY": "",
        "DISTRICT": "",
        "STATE/PROVINCE": "",
        "ZIP/POSTAL CODE": "",
        "COUNTRY": "India",
        "CONTACT PHONE": str[2],
        "CONTACT PERSON": "",
        "STORE SIZE": "",
        "GEO COORDINATES": "",
        "TIER LEVEL OF GOODS SOLD": "",
        "URL": "http://www.micromaxinfo.com/store-locator",
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
saveCsv('MICROMAX-csv.csv', arr);
saveJson('MICROMAX-json.json', arr);

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