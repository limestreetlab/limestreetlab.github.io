/*
script to parse and aggregate property price csv files into one
csv files are expected to contain data file per city.
file format expected:
- first column be city name
- column names of "Period", "Average price All Property types", "Average price Detached houses", "Average price Semi-detached houses", "Average price Terraced houses", "Average price Flats and maisonettes"
*/

const fs = require('fs'); 
const csvParser = require('csv-parse'); //csv parsing library

//input file paths
const files = [
"C:/Users/bluer/Dropbox/Houghton Street/deanstreetlab.github.io/dataset/UK housing/aberdeen.csv",
"C:/Users/bluer/Dropbox/Houghton Street/deanstreetlab.github.io/dataset/UK housing/barnet.csv",
"C:/Users/bluer/Dropbox/Houghton Street/deanstreetlab.github.io/dataset/UK housing/birmingham.csv",
"C:/Users/bluer/Dropbox/Houghton Street/deanstreetlab.github.io/dataset/UK housing/brighton.csv",
"C:/Users/bluer/Dropbox/Houghton Street/deanstreetlab.github.io/dataset/UK housing/bristol.csv",
"C:/Users/bluer/Dropbox/Houghton Street/deanstreetlab.github.io/dataset/UK housing/cambridge.csv",
"C:/Users/bluer/Dropbox/Houghton Street/deanstreetlab.github.io/dataset/UK housing/camden.csv",
"C:/Users/bluer/Dropbox/Houghton Street/deanstreetlab.github.io/dataset/UK housing/cheltenham.csv",
"C:/Users/bluer/Dropbox/Houghton Street/deanstreetlab.github.io/dataset/UK housing/colchester.csv",
"C:/Users/bluer/Dropbox/Houghton Street/deanstreetlab.github.io/dataset/UK housing/county-durham.csv",
"C:/Users/bluer/Dropbox/Houghton Street/deanstreetlab.github.io/dataset/UK housing/coventry.csv",
"C:/Users/bluer/Dropbox/Houghton Street/deanstreetlab.github.io/dataset/UK housing/croydon.csv",
"C:/Users/bluer/Dropbox/Houghton Street/deanstreetlab.github.io/dataset/UK housing/ealing.csv",
"C:/Users/bluer/Dropbox/Houghton Street/deanstreetlab.github.io/dataset/UK housing/edinburgh.csv",
"C:/Users/bluer/Dropbox/Houghton Street/deanstreetlab.github.io/dataset/UK housing/exeter.csv",
"C:/Users/bluer/Dropbox/Houghton Street/deanstreetlab.github.io/dataset/UK housing/glasgow.csv",
"C:/Users/bluer/Dropbox/Houghton Street/deanstreetlab.github.io/dataset/UK housing/gloucester.csv",
"C:/Users/bluer/Dropbox/Houghton Street/deanstreetlab.github.io/dataset/UK housing/hammersmith-and-fulham.csv",
"C:/Users/bluer/Dropbox/Houghton Street/deanstreetlab.github.io/dataset/UK housing/harrow.csv",
"C:/Users/bluer/Dropbox/Houghton Street/deanstreetlab.github.io/dataset/UK housing/inner-london.csv",
"C:/Users/bluer/Dropbox/Houghton Street/deanstreetlab.github.io/dataset/UK housing/kensington-and-chelsea.csv",
"C:/Users/bluer/Dropbox/Houghton Street/deanstreetlab.github.io/dataset/UK housing/kingston-upon-thames.csv",
"C:/Users/bluer/Dropbox/Houghton Street/deanstreetlab.github.io/dataset/UK housing/leeds.csv",
"C:/Users/bluer/Dropbox/Houghton Street/deanstreetlab.github.io/dataset/UK housing/leicester.csv",
"C:/Users/bluer/Dropbox/Houghton Street/deanstreetlab.github.io/dataset/UK housing/liverpool.csv",
"C:/Users/bluer/Dropbox/Houghton Street/deanstreetlab.github.io/dataset/UK housing/manchester.csv",
"C:/Users/bluer/Dropbox/Houghton Street/deanstreetlab.github.io/dataset/UK housing/milton-keynes.csv",
"C:/Users/bluer/Dropbox/Houghton Street/deanstreetlab.github.io/dataset/UK housing/newcastle.csv",
"C:/Users/bluer/Dropbox/Houghton Street/deanstreetlab.github.io/dataset/UK housing/norwich.csv",
"C:/Users/bluer/Dropbox/Houghton Street/deanstreetlab.github.io/dataset/UK housing/nottingham.csv",
"C:/Users/bluer/Dropbox/Houghton Street/deanstreetlab.github.io/dataset/UK housing/outer-london.csv",
"C:/Users/bluer/Dropbox/Houghton Street/deanstreetlab.github.io/dataset/UK housing/oxford.csv",
"C:/Users/bluer/Dropbox/Houghton Street/deanstreetlab.github.io/dataset/UK housing/reading.csv",
"C:/Users/bluer/Dropbox/Houghton Street/deanstreetlab.github.io/dataset/UK housing/richmond-upon-thames.csv",
"C:/Users/bluer/Dropbox/Houghton Street/deanstreetlab.github.io/dataset/UK housing/sheffield.csv",
"C:/Users/bluer/Dropbox/Houghton Street/deanstreetlab.github.io/dataset/UK housing/southampton.csv",
"C:/Users/bluer/Dropbox/Houghton Street/deanstreetlab.github.io/dataset/UK housing/sunderland.csv",
"C:/Users/bluer/Dropbox/Houghton Street/deanstreetlab.github.io/dataset/UK housing/sutton.csv",
"C:/Users/bluer/Dropbox/Houghton Street/deanstreetlab.github.io/dataset/UK housing/wandsworth.csv",
"C:/Users/bluer/Dropbox/Houghton Street/deanstreetlab.github.io/dataset/UK housing/york.csv"
];

//check the file paths are all valid
files.forEach( function(f) {
  fs.promises.access(f)
              .catch( function() {
                console.log(f + " is not accessible");
                throw new Error("file path error: " + f);
              });
});

let dataObj = {}; //object to contain all data in form {"cityA":[{data}], "cityB":[{data}], ...} 
let promises = []; //to hold array of promises
let outputPath = "C:/Users/bluer/Downloads/aggregate.json"; //output path

files.forEach( function(f) {
    let contents = fs.readFileSync(f, {encoding: "utf8"}); //read the entire csv file
    promises.push(parse(contents)); //call defined parse function on file content and append parsed result (a promise) to array
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
