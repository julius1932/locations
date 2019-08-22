const jsonfile = require('jsonfile');
var stringify = require('csv-stringify');
const fs = require('fs');

var arr = [];
var data = jsonfile.readFileSync('./dataJson.json');
data.forEach(function(tt) {
    let adr = tt.other.split("\n")[0];
    console.log(adr);
    let Contact = "";
    let ContactP = "";
    let arrr = tt.other.split("\n");
    arrr.forEach(function(ele) {
        if (ele.includes("Contact No")) {
            Contact = ele.split(":")[1];

        }
        if (ele.includes("Contact Person")) {
            ContactP = ele.split(":")[1];

        }
    })
    let item = {
        "BRANDS SOLD": "",
        "PRODUCT TYPES/ CATEGORIES": "TV",
        "RETAILER TYPE": "Consumer Electronics",
        "RETAILER_ID": "",
        "RETAILER NAME": "PITTAPPILLIL",
        "LOCATION NAME": "",
        "ADDRESS": adr,
        "LAND MARK": "",
        "CITY": "",
        "DISTRICT": "",
        "STATE/PROVINCE": "",
        "ZIP/POSTAL CODE": "",
        "COUNTRY": "",
        "CONTACT PHONE": Contact,
        "CONTACT PERSON": ContactP,
        "STORE SIZE": "",
        "GEO COORDINATES": "",
        "TIER LEVEL OF GOODS SOLD": "",
        "URL": "https://pittappillilonline.com/BranchLocator.aspx",
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
saveCsv('PITTAPPILLIL-csv.csv', arr);
saveJson('PITTAPPILLIL-json.json', arr);

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