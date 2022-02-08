//used to parse and aggregate property price data

const fs = require('fs');
const csvParser = require('csv-parse');


const files = ["", "", ]; //input file paths
let obj = {};
let promises = [];

files.forEach(function(f){
    let contents = fs.readFileSync(f, {encoding: "utf8"});
    promises.push(parse(contents));
});

Promise.all(promises).then( () =>
  fs.writeFile("C:/Users/bluer/Downloads/property.json", JSON.stringify(obj), () => console.log("file written"))
);

function parse(contents) {

  return new Promise(function(resolve, reject) {

    csvParser.parse(contents, {delimiter: ","}, function(err, data){

      const dateIndex = data[0].indexOf("Period");
      const priceIndex = data[0].indexOf("Average price All property types");
      const city = data[1][0];
      const rows = data.length;
      let arr = [];

      for (let i = 1; i < rows; i++) {
        arr.push({"date": data[i][dateIndex], "price": parseInt(data[i][priceIndex]), "change": parseInt(data[i][priceIndex])/parseInt(data[1][priceIndex])});
      }

      obj[city] = arr;

      resolve();

    });

  });

}
