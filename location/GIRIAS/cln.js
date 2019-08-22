const jsonfile = require('jsonfile');
var stringify = require('csv-stringify');
const fs = require('fs');

var arr = [];
var data = jsonfile.readFileSync('./dataJson.json');
data.forEach(function(tt) {
    if (tt.other.includes("\n")) {
        var item = {
            "BRANDS SOLD": "",
            "PRODUCT TYPES/ CATEGORIES": "TV",
            "RETAILER TYPE": "Consumer Electronics",
            "RETAILER_ID": "",
            "RETAILER NAME": "GIRIAS",
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
            "URL": "https://www.giriasindia.com/index.php/storelocator/",
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
        let str = tt.other.split("VIEW")[0].split("\n");
        item["CITY"] = str[2];
        item["ADDRESS"] = str[1];
        item["STATE/PROVINCE"] = str[3];
        for (let i = 0; i < str.length; i++) {
            if (str[i].includes("Phone")) {
                item["CONTACT PHONE"] = str[i].split(":")[1];
                break;
            }
        }
        arr.push(item);
    }
});
saveCsv('GIRIAS.csv', arr);
saveJson('GIRIAS-json.json', arr);

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