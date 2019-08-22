const jsonfile = require('jsonfile');
var stringify = require('csv-stringify');
const fs = require('fs');

var arr = [];
var data = jsonfile.readFileSync('./dataJson.json');
data.forEach(function(tt) {
    let ContactP = tt.other.split("\n")[0];
    
    let Contact = tt.other.split("\n")[2];
    
     
    let item = {
        "BRANDS SOLD": "",
        "PRODUCT TYPES/ CATEGORIES": "TV",
        "RETAILER TYPE": "Consumer Electronics",
        "RETAILER_ID": "",
        "RETAILER NAME": "AB BISMI",
        "LOCATION NAME": "",
        "ADDRESS": "",
        "LAND MARK": "",
        "CITY": tt.title.split(" ")[1],
        "DISTRICT": "",
        "STATE/PROVINCE": "",
        "ZIP/POSTAL CODE": "",
        "COUNTRY": "",
        "CONTACT PHONE": Contact,
        "CONTACT PERSON": ContactP,
        "STORE SIZE": "",
        "GEO COORDINATES": "",
        "TIER LEVEL OF GOODS SOLD": "",
        "URL": "https://www.bismigroup.com/branch/",
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
saveCsv('AB BISMI-csv.csv', arr);
saveJson('AB BISMI-json.json', arr);

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