/*
scripts to aggregate data in individual admission stat files into one json file
each year there are some unknown random schools apply which shouldn't be counted, only schools that have applications to oxbridge in all years will be included in the list
after aggregating data into an array of objects, it then sums the cambridge and oxford data as key for the year
this script requires direct inputting of input file paths, school (cambridge or oxford), and file year as well as output filepath
*/
const fs = require("fs");
const parser = require("csv-parser");

const outputPath = "/Users/houghtonstreet/Dropbox/Lime Street/limestreetlab.github.io/blog/data/oxbridge/data.json";
let data = [];

/*
read the latest cambridge data csv
convert the data into javascript objects one by one and collect into an array
call a helper function to read further csv files and feed into the array
when all done, write the json out
*/
fs.createReadStream("/Users/houghtonstreet/Dropbox/Lime Street/limestreetlab.github.io/blog/data/oxbridge/extracted/cambridge_2023.csv", { encoding: "utf-8" })
  .pipe(parser({skipLines: 1, headers: ["ucas", "school", "postcode", "status", "cambridge_application_2023", "cambridge_offer_2023"]}))
  .on("data", (line) => {
    let offerRate = Math.round( (line.cambridge_offer_2023 / line.cambridge_application_2023)*100 );
    line.cambridge_success_2023 = !isNaN(offerRate) ? offerRate + "%" : "";
    line.status = (line.status.toLowerCase() == "independent") ? "Private" : "Public"; 
    data.push(line);
  })
  .on("end", () => {

    let promise = addData("/Users/houghtonstreet/Dropbox/Lime Street/limestreetlab.github.io/blog/data/oxbridge/extracted/cambridge_2022.csv", "cambridge", 2022);
    promise.then( function() {
      return addData("/Users/houghtonstreet/Dropbox/Lime Street/limestreetlab.github.io/blog/data/oxbridge/extracted/cambridge_2021.csv", "cambridge", 2021);
    }).then( function() {
      return addData("/Users/houghtonstreet/Dropbox/Lime Street/limestreetlab.github.io/blog/data/oxbridge/extracted/cambridge_2020.csv", "cambridge", 2020);
    }).then( function() {
      return addData("/Users/houghtonstreet/Dropbox/Lime Street/limestreetlab.github.io/blog/data/oxbridge/extracted/cambridge_2019.csv", "cambridge", 2019);
    }).then( function() {
      return addData("/Users/houghtonstreet/Dropbox/Lime Street/limestreetlab.github.io/blog/data/oxbridge/extracted/oxford_2023.csv", "oxford", 2023);
    }).then( function() {
      return addData("/Users/houghtonstreet/Dropbox/Lime Street/limestreetlab.github.io/blog/data/oxbridge/extracted/oxford_2022.csv", "oxford", 2022);
    }).then( function() {
      return addData("/Users/houghtonstreet/Dropbox/Lime Street/limestreetlab.github.io/blog/data/oxbridge/extracted/oxford_2021.csv", "oxford", 2021);
    }).then( function() {
      return addData("/Users/houghtonstreet/Dropbox/Lime Street/limestreetlab.github.io/blog/data/oxbridge/extracted/oxford_2020.csv", "oxford", 2020);
    }).then( function() {
      return addData("/Users/houghtonstreet/Dropbox/Lime Street/limestreetlab.github.io/blog/data/oxbridge/extracted/oxford_2019.csv", "oxford", 2019);
    }).then( function() {
      addOxbridge(2019, 2023);
      fs.writeFileSync(outputPath, JSON.stringify(data), "utf8");
    })
   
  });

/*
helper function to read csv files and collect relevant data into the master data array
*/
function addData(filepath, school, year) {

  return new Promise((resolve) => {

    let lines = []; //container for data read from this file

    fs.createReadStream(filepath, { encoding: "utf-8" })
      .pipe(parser())
      .on("data", (line) => {
        let offerRate = Math.round( (line.offer / line.application)*100 );
        line.success = (!isNaN(offerRate) && offerRate != 0) ? offerRate + "%" : "";
        lines.push(line);
    })
    .on("end", () => {
      
      for (let i = 0; i < data.length; i++) { //loop through the master array to add data to it one by one
        
        let key = data[i].ucas; //the ucas id to search for
    
        let found = lines.find(({ucas}) => ucas == key); //the line where the school is matched
        
        if (typeof(found) != "undefined") { //where a school is found, add that school's data to master data variable
          data[i][school + "_application_" + year] = found.application; 
          data[i][school + "_offer_" + year] = found.offer;
          data[i][school + "_success_" + year] = found.success;
        } else { //if the school is not found in this file, applications are not consistent, remove it from master data array
          delete data[i]; //delete that record, leaving that index undefined, to be filtered in a later step
        }
      }

      data = data.filter( (record) => record !== "undefined" );

      resolve();

    });

  });
}

/*
helper function to add the cambridge and oxford application/offer data per year
@param startYear the earliest year in the range to add
@param endYear the last year in the range to add
*/
function addOxbridge(startYear, endYear) {
  
  for (let i = 0; i < data.length; i++) {

    for (let j = endYear; j >= startYear; j--) {

      let year = j;
      //chunk to add applications
      if ( Number.isInteger(Number(data[i]["cambridge_application_" + year])) & Number.isInteger(Number(data[i]["oxford_application_" + year])) ) { //when both cambridge and oxford data are numeric
        data[i]["oxbridge_application_" + year] = Number(data[i]["cambridge_application_" + year]) + Number(data[i]["oxford_application_" + year]); //add the numbers
      } else if ( !Number.isInteger(Number(data[i]["cambridge_application_" + year])) & Number.isInteger(Number(data[i]["oxford_application_" + year])) ) { //oxford is numeric but not cambridge
        data[i]["oxbridge_application_" + year] = Number(data[i]["oxford_application_"] + year); //add only oxford
      } else if ( !Number.isInteger(Number(data[i]["oxford_application_" + year])) & Number.isInteger(Number(data[i]["cambridge_application_" + year])) ) { //cambridge is numeric but not oxford
        data[i]["oxbridge_application_" + year] = Number(data[i]["cambridge_application_" + year]); //add only cambridge
      } else { //both are non-numeric
        data[i]["oxbridge_application_" + year] = "<3"; //set to <3 string
      }

      //chunk to add offers
      if ( Number.isInteger(Number(data[i]["cambridge_offer_" + year])) & Number.isInteger(Number(data[i]["oxford_offer_" + year])) ) { //when both cambridge and oxford data are numeric
        data[i]["oxbridge_offer_" + year] = Number(data[i]["cambridge_offer_" + year]) + Number(data[i]["oxford_offer_" + year]); //add the numbers
      } else if ( !Number.isInteger(Number(data[i]["cambridge_offer_" + year])) & Number.isInteger(Number(data[i]["oxford_offer_" + year])) ) { //oxford is numeric but not cambridge
        data[i]["oxbridge_offer_" + year] = Number(data[i]["oxford_offer_"] + year); //add only oxford
      } else if ( !Number.isInteger(Number(data[i]["oxford_offer_" + year])) & Number.isInteger(Number(data[i]["cambridge_offer_" + year])) ) { //cambridge is numeric but not oxford
        data[i]["oxbridge_offer_" + year] = Number(data[i]["cambridge_offer_" + year]); //add only cambridge
      } else { //both are non-numeric
        data[i]["oxbridge_offer_" + year] = "<3"; //set to <3 string
      }

      //chunk to calc offer success %
      let offerRate = Math.round( (data[i]["oxbridge_offer_" + year] / data[i]["oxbridge_application_" + year])*100 );
      data[i]["oxbridge_success_" + year] = !isNaN(offerRate) ? offerRate + "%" : "";

    }

  }
}



