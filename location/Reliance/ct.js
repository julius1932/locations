const jsonfile = require('jsonfile');
var indiaTowns = jsonfile.readFileSync('./cities.json');
var keys = Object.keys(indiaTowns);
var item = {};
keys.forEach(function(key) {
    let arr = indiaTowns[key];
    arr.forEach(function(ele) {
        item[ele.toUpperCase()] = key;
    })
});
 jsonfile.writeFile('./citStates.json', item, { spaces: 2 }, function(err) {
           
            console.error(err + ' ==' );

        });