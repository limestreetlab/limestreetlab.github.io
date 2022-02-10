//script to parse and aggregate property price csv files into one

const fs = require('fs');
const csvParser = require('csv-parse');

//input file paths
const files = [
"C:/Users/bluer/Dropbox/Dean Street/deanstreetlab.github.io/dataset/UK housing/aberdeen.csv",
"C:/Users/bluer/Dropbox/Dean Street/deanstreetlab.github.io/dataset/UK housing/barnet.csv",
"C:/Users/bluer/Dropbox/Dean Street/deanstreetlab.github.io/dataset/UK housing/birmingham.csv",
"C:/Users/bluer/Dropbox/Dean Street/deanstreetlab.github.io/dataset/UK housing/brighton.csv",
"C:/Users/bluer/Dropbox/Dean Street/deanstreetlab.github.io/dataset/UK housing/bristol.csv",
"C:/Users/bluer/Dropbox/Dean Street/deanstreetlab.github.io/dataset/UK housing/cambridge.csv",
"C:/Users/bluer/Dropbox/Dean Street/deanstreetlab.github.io/dataset/UK housing/camden.csv",
"C:/Users/bluer/Dropbox/Dean Street/deanstreetlab.github.io/dataset/UK housing/cheltenham.csv",
"C:/Users/bluer/Dropbox/Dean Street/deanstreetlab.github.io/dataset/UK housing/colchester.csv",
"C:/Users/bluer/Dropbox/Dean Street/deanstreetlab.github.io/dataset/UK housing/county-durham.csv",
"C:/Users/bluer/Dropbox/Dean Street/deanstreetlab.github.io/dataset/UK housing/coventry.csv",
"C:/Users/bluer/Dropbox/Dean Street/deanstreetlab.github.io/dataset/UK housing/croydon.csv",
"C:/Users/bluer/Dropbox/Dean Street/deanstreetlab.github.io/dataset/UK housing/ealing.csv",
"C:/Users/bluer/Dropbox/Dean Street/deanstreetlab.github.io/dataset/UK housing/edinburgh.csv",
"C:/Users/bluer/Dropbox/Dean Street/deanstreetlab.github.io/dataset/UK housing/exeter.csv",
"C:/Users/bluer/Dropbox/Dean Street/deanstreetlab.github.io/dataset/UK housing/glasgow.csv",
"C:/Users/bluer/Dropbox/Dean Street/deanstreetlab.github.io/dataset/UK housing/gloucester.csv",
"C:/Users/bluer/Dropbox/Dean Street/deanstreetlab.github.io/dataset/UK housing/hammersmith-and-fulham.csv",
"C:/Users/bluer/Dropbox/Dean Street/deanstreetlab.github.io/dataset/UK housing/harrow.csv",
"C:/Users/bluer/Dropbox/Dean Street/deanstreetlab.github.io/dataset/UK housing/inner-london.csv",
"C:/Users/bluer/Dropbox/Dean Street/deanstreetlab.github.io/dataset/UK housing/kensington-and-chelsea.csv",
"C:/Users/bluer/Dropbox/Dean Street/deanstreetlab.github.io/dataset/UK housing/kingston-upon-thames.csv",
"C:/Users/bluer/Dropbox/Dean Street/deanstreetlab.github.io/dataset/UK housing/leeds.csv",
"C:/Users/bluer/Dropbox/Dean Street/deanstreetlab.github.io/dataset/UK housing/leicester.csv",
"C:/Users/bluer/Dropbox/Dean Street/deanstreetlab.github.io/dataset/UK housing/liverpool.csv",
"C:/Users/bluer/Dropbox/Dean Street/deanstreetlab.github.io/dataset/UK housing/manchester.csv",
"C:/Users/bluer/Dropbox/Dean Street/deanstreetlab.github.io/dataset/UK housing/milton-keynes.csv",
"C:/Users/bluer/Dropbox/Dean Street/deanstreetlab.github.io/dataset/UK housing/newcastle.csv",
"C:/Users/bluer/Dropbox/Dean Street/deanstreetlab.github.io/dataset/UK housing/norwich.csv",
"C:/Users/bluer/Dropbox/Dean Street/deanstreetlab.github.io/dataset/UK housing/nottingham.csv",
"C:/Users/bluer/Dropbox/Dean Street/deanstreetlab.github.io/dataset/UK housing/outer-london.csv",
"C:/Users/bluer/Dropbox/Dean Street/deanstreetlab.github.io/dataset/UK housing/oxford.csv",
"C:/Users/bluer/Dropbox/Dean Street/deanstreetlab.github.io/dataset/UK housing/reading.csv",
"C:/Users/bluer/Dropbox/Dean Street/deanstreetlab.github.io/dataset/UK housing/richmond-upon-thames.csv",
"C:/Users/bluer/Dropbox/Dean Street/deanstreetlab.github.io/dataset/UK housing/sheffield.csv",
"C:/Users/bluer/Dropbox/Dean Street/deanstreetlab.github.io/dataset/UK housing/southampton.csv",
"C:/Users/bluer/Dropbox/Dean Street/deanstreetlab.github.io/dataset/UK housing/sunderland.csv",
"C:/Users/bluer/Dropbox/Dean Street/deanstreetlab.github.io/dataset/UK housing/sutton.csv",
"C:/Users/bluer/Dropbox/Dean Street/deanstreetlab.github.io/dataset/UK housing/wandsworth.csv",
"C:/Users/bluer/Dropbox/Dean Street/deanstreetlab.github.io/dataset/UK housing/york.csv"
];

//check the file paths are valid
files.forEach( function(f) {
  fs.promises.access(f)
              .catch( function() {
                console.log(f + " is not accessible");
                throw new Error("file path error");
              });
});

let obj = {};
let promises = [];

files.forEach(function(f){
    let contents = fs.readFileSync(f, {encoding: "utf8"});
    promises.push(parse(contents));
});

Promise.all(promises).then( () =>
  fs.writeFile("C:/Users/bluer/Downloads/aggregate.json", JSON.stringify(obj), () => console.log("file written"))
);

function parse(contents) {

  return new Promise(function(resolve, reject) {

    csvParser.parse(contents, {delimiter: ","}, function(err, data){

      const dateIndex = data[0].indexOf("Period"); //the array index for date
      const allPriceIndex = data[0].indexOf("Average price All property types"); //index for all property types
      const detachedPriceIndex = data[0].indexOf("Average price Detached houses"); //index for detached
      const semidetachedPriceIndex = data[0].indexOf("Average price Semi-detached houses"); //index for semidetached
      const terracedPriceIndex = data[0].indexOf("Average price Terraced houses"); //index for terraced
      const flatPriceIndex = data[0].indexOf("Average price Flats and maisonettes"); //index for flats
      const city = data[1][0]; //location name
      const rows = data.length; //number of data points
      let arr = []; //data container

      for (let i = 1; i < rows; i++) {
        arr.push({"date": data[i][dateIndex], "allPrice": parseInt(data[i][allPriceIndex]), "change": parseInt(data[i][allPriceIndex])/parseInt(data[1][allPriceIndex]), "detachedPrice": parseInt(data[i][detachedPriceIndex]), "semidetachedPrice": parseInt(data[i][semidetachedPriceIndex]), "terracedPrice": parseInt(data[i][terracedPriceIndex]), "flatPrice": parseInt(data[i][flatPriceIndex])});
      }

      obj[city] = arr;

      resolve();

    });

  });

}
