/*
script to parse wanted data from individual property price csv files and aggregate them into one file
csv files are expected to contain data file per city/region. 
file format expected:
- first column be city/area name
- column names of "Period", "Average price All Property types", "Average price Detached houses", "Average price Semi-detached houses", "Average price Terraced houses", "Average price Flats and maisonettes"
*/

const fs = require('fs'); //file system lib
const path = require("path"); //file path lib
const csvParser = require('csv-parse'); //csv parsing library

const dir = "/Users/houghtonstreet/Documents/datasets/housing"; //INPUT the abs path of directory where files are located
const outputPath = "/Users/houghtonstreet/Dropbox/Lime Street/limestreetlab.github.io/blog/data/housing_data.json"; //INPUT output path for aggregated file

let filePaths = []; //store csv file paths in the directory
let dataObj = {}; //object to contain all data in form {"cityA":[{data}], "cityB":[{data}], ...} 
let promises = []; //to hold array of promises

//populate the file path arr with .csv files in the directory
let files = fs.readdirSync(dir);
files.forEach(file => {
  if (path.extname(file) == ".csv") {
    filePaths.push(path.resolve(dir, file));
  }
});

filePaths.forEach( file => {
    let contents = fs.readFileSync(file, {encoding: "utf8"}); //read the entire csv file
    promises.push(parse(contents)); //call self-defined parse function on read file content and append parsed result (a promise) to array
});

//write data out when all files are read
Promise.all(promises).then( () =>
  fs.writeFile(outputPath, JSON.stringify(dataObj), () => console.log("csv files parsed and saved to: " + outputPath))
);

/*
receive csv file contents and read relevant data into an associative array
*/
function parse(contents) {

  return new Promise(function(resolve, reject) {

    //parse csv data into array data
    csvParser.parse(contents, {delimiter: ","}, function(err, data){

      const dateIndex = data[0].indexOf("Period"); //the array index for date
      const allPriceIndex = data[0].indexOf("Average price All property types"); //index for all property types
      const detachedPriceIndex = data[0].indexOf("Average price Detached houses"); //index for detached
      const semidetachedPriceIndex = data[0].indexOf("Average price Semi-detached houses"); //index for semidetached
      const terracedPriceIndex = data[0].indexOf("Average price Terraced houses"); //index for terraced
      const flatPriceIndex = data[0].indexOf("Average price Flats and maisonettes"); //index for flats
      const city = data[1][0]; //location name of this file, requiring location name in column 1
      const rows = data.length; //number of data points
      let arr = []; //data container
      
      //loop through rows and assign data to container
      for (let i = 1; i < rows; i++) {
        arr.push({"date": data[i][dateIndex], "allPrice": parseInt(data[i][allPriceIndex]), "change": parseInt(data[i][allPriceIndex])/parseInt(data[1][allPriceIndex]), "detachedPrice": parseInt(data[i][detachedPriceIndex]), "semidetachedPrice": parseInt(data[i][semidetachedPriceIndex]), "terracedPrice": parseInt(data[i][terracedPriceIndex]), "flatPrice": parseInt(data[i][flatPriceIndex])});
      }

      dataObj[city] = arr;

      resolve();

    });

  });

}
