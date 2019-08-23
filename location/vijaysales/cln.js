const jsonfile = require('jsonfile');
var stringify = require('csv-stringify');
const fs = require('fs');

var arr = [];
var data = jsonfile.readFileSync('./dataJson.json');
data.forEach(function(tt) {
    let str = tt['ADDRESS'].split(",");
     str = str.filter(word => word.trim());
    
    let lnd = "";

    str.forEach(function(s) {
        if (s.toLowerCase().includes("near") || s.toLowerCase().includes("opp")) {
            lnd += " " + s;
        }
    });
    var item = {
    "BRANDS SOLD": "",
    "PRODUCT TYPES/ CATEGORIES": "TV",
    "RETAILER TYPE": "Consumer Electronics",
    "RETAILER_ID": "",
    "RETAILER NAME": "VIJAY SALES",
    "LOCATION NAME": "",
    "ADDRESS": "",
    "LAND MARK": lnd,
    "CITY": "",
    "DISTRICT": "",
    "STATE/PROVINCE": "",
    "ZIP/POSTAL CODE": "",
    "COUNTRY": "",
    "CONTACT PHONE": "",
    "STORE SIZE": "",
    "GEO COORDINATES": "",
    "TIER LEVEL OF GOODS SOLD": "",
    "URL": "https://www.vijaysales.com/store-locator",
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
    item["CITY"] = tt['state'];
    item["CONTACT PHONE"] = tt['CONTACT'];
    item["ADDRESS"] = tt['ADDRESS'];
    item["ZIP/POSTAL CODE"]=tt['ADDRESS'].split("-").pop();
     item["DISTRICT"] = tt['DISTRICT'];
    arr.push(item);
});
saveCsv('vijaysales-csv.csv', arr);
saveJson('vijaysales-json.json', arr);
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