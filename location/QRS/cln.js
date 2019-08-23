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
    "RETAILER NAME": "QRS",
    "LOCATION NAME": "",
    "ADDRESS": tt.other,
    "LAND MARK": "",
    "CITY": tt.city,
    "DISTRICT": "",
    "STATE/PROVINCE": tt.state,
    "ZIP/POSTAL CODE": tt.zip,
    "COUNTRY": "India",
    "CONTACT PHONE": tt.Phone,
    "CONTACT PERSON":tt["Branch Manager"],
    "STORE SIZE": "",
    "GEO COORDINATES": "",
    "TIER LEVEL OF GOODS SOLD": "",
    "URL": "https://qrs.in/pages/store",
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
saveCsv('QRS-csv.csv', arr);
saveJson('QRS-json.json', arr);
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