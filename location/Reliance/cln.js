const jsonfile = require('jsonfile');
var stringify = require('csv-stringify');
const fs = require('fs');

var arr = [];
var data = jsonfile.readFileSync('./dataJson.json');
var citStates = jsonfile.readFileSync('./citStates.json');
data.forEach(function(tt) {
    let str = tt['address'].split(",");
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
    "RETAILER NAME": "RELIANCE DIGITAL",
    "LOCATION NAME": "",
    "ADDRESS": tt["address"],
    "LAND MARK": lnd,
    "CITY": tt["City"],
    "DISTRICT": "",
    "STATE/PROVINCE": citStates[tt["City"].toUpperCase()],
    "ZIP/POSTAL CODE": tt["Pincode"],
    "COUNTRY": "",
    "CONTACT PHONE": "",
    "STORE SIZE": "",
    "GEO COORDINATES": "",
    "TIER LEVEL OF GOODS SOLD": "",
    "URL": "https://www.reliancedigital.in/locateus",
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
saveCsv('reliancedigital-csv.csv', arr);
saveJson('reliancedigital-json.json', arr);
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