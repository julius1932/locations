const jsonfile = require('jsonfile');
var stringify = require('csv-stringify');
const fs = require('fs');

var arr = [];
var data = jsonfile.readFileSync('./dataJson.json');
data.forEach(function(tt) {
    let str = tt.other.split("\n");
    let adr = "";
    let land = "";
    for (let i = 1; i < str.length; i++) {
        adr += " " + str[i];
        if (str[i].includes("Opp") || str[i].includes("ear")) {
            land += " " + str[i];
        }
    }
    let item = {
        "BRANDS SOLD": "",
        "PRODUCT TYPES/ CATEGORIES": "TV",
        "RETAILER TYPE": "Consumer Electronics",
        "RETAILER_ID": "",
        "RETAILER NAME": "SNEHANJALI",
        "LOCATION NAME": str[0],
        "ADDRESS": adr,
        "LAND MARK": land,
        "CITY": "",
        "DISTRICT": "",
        "STATE/PROVINCE": "",
        "ZIP/POSTAL CODE": "",
        "COUNTRY": "India",
        "CONTACT PHONE": "",
        "CONTACT PERSON": "",
        "STORE SIZE": "",
        "GEO COORDINATES": "",
        "TIER LEVEL OF GOODS SOLD": "",
        "URL": "https://snehanjalielectronics.com/stores",
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
saveCsv('SNEHANJALI-csv.csv', arr);
saveJson('SNEHANJALI-json.json', arr);

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