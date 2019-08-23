const jsonfile = require('jsonfile');
var stringify = require('csv-stringify');
const fs = require('fs');

var arr = [];
var data = jsonfile.readFileSync('./dataJson.json');
data.forEach(function(tt) {
    
    let zip = "";
   
    str = tt["ADDRESS"].trim().split("\n");
    str = str.filter(word => word.trim());
    
    if (str[str.length - 1]) {
        var matches = str[str.length - 1].trim().match(/s*(\d+)/);
        zip = matches ? matches[0] : "";
    }

    str.forEach(function(s) {
        if (s.toLowerCase().includes("near") || s.toLowerCase().includes("opp")) {
            lnd += " " + s;
        }
    });
    let item = {
        "BRANDS SOLD": "CROMA",
        "PRODUCT TYPES/ CATEGORIES": "TV",
        "RETAILER TYPE": "Consumer Electronics",
        "RETAILER_ID": "",
        "RETAILER NAME": "CROMA",
        "LOCATION NAME": tt.location,
        "ADDRESS": tt.ADDRESS,
        "LAND MARK": "",
        "CITY": tt.city,
        "DISTRICT": "",
        "STATE/PROVINCE": "",
        "ZIP/POSTAL CODE": zip,
        "COUNTRY": "India",
        "CONTACT PHONE": "",
        "CONTACT PERSON": "",
        "STORE SIZE": "",
        "GEO COORDINATES": "",
        "TIER LEVEL OF GOODS SOLD": "",
        "URL": tt.url,
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
saveCsv('CROMA-csv.csv', arr);
saveJson('CROMA-json.json', arr);

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