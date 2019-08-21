const jsonfile = require('jsonfile');
var stringify = require('csv-stringify');
const fs = require('fs');
var item = {
    "BRANDS SOLD": "AKAI",
    "PRODUCT TYPES/ CATEGORIES": "TV",
    "RETAILER TYPE": "Consumer Electronics",
    "RETAILER_ID": "",
    "RETAILER NAME": "",
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
var arr = [];
var data = jsonfile.readFileSync('./dataJson.json');
data.forEach(function(tt) {
    item["RETAILER NAME"] = tt['Dealer'];
    item["CITY"] = tt['City Name'];
    item["CONTACT PHONE"] = tt['Contact Number'];
    item["CONTACT PERSON"] = tt['Dealer Name'];
    arr.push(item);
});
saveCsv('akai-csv.csv', arr);
saveJson('akai-json.json', arr);
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