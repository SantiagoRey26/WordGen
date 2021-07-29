//requiring file system and gibrish module
const fs = require('fs');
const Gibrish = require("gibrish");
//gibrish constructor
var g = new Gibrish();

//file system reader function
fs.readFile('localidades.csv', 'utf8' , (err, data) => {
  if (err) return console.error(err);
  const arr = data.split("\n").map(line => line.split(','));
//list of processed names
  var femNames = [];
//loop processing names
  for (let i=1; i<arr.length; i++) {
    if (typeof arr[i][11] == "string"){
      if (arr[i][11].length >= 3) {
        femNames.push(arr[i][11]);
      }
    }
  };

  //console.log(femNames);
//gibrish function processing fake names with markov chains
//Ord is how many letters ahead calculate probability. cant is how many names outputs
  function genNames(ord, cant, wichList) {
    var nameList = [];

    g.options.order= ord;
    g.push(wichList);

    if (typeof cant != "number") cant= 1;
  
    for (var i=0; i < cant; i++) {
        var newName = g.generate();

        if (newName.length < 4) {
            i-=1;
            continue;
        } else {
            newName = newName.toLowerCase(); 
            nameList.push(newName.replace(newName[0], newName[0].toUpperCase()));
        }

    }
    return nameList;
}


console.log(genNames(3, 20, femNames));

});
