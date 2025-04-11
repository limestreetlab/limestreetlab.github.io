/*
script to run after a master data file is aggregated, in order to re-classify sixth form colleges from public to 6form based on a manually compiled list
*/

const fs = require("fs");

const filePath = "/Users/houghtonstreet/Dropbox/Lime Street/limestreetlab.github.io/blog/data/oxbridge/data.json"; //path for the final json file
const sixthFormFilePath = "/Users/houghtonstreet/Dropbox/Lime Street/limestreetlab.github.io/blog/data/oxbridge/raw/sixth_form_list.txt"; //path for the 6form college list (ucas)

fs.readFile(sixthFormFilePath, "utf8", function(err, contents) {
    
    const sixthFormList = contents.split(/\r?\n/); //break the read data (ucas) line by line to an array
    const data = JSON.parse( fs.readFileSync(filePath, "utf8") ); //read in the json data file to be checked
    
    for (let i = 0; i < sixthFormList.length; i++) {

        let key = sixthFormList[i]; //the ucas to search for
        let found = data.findIndex(({ucas}) => ucas == key); //find the array index whose record matching the ucas key, -1 if not found

        if (found > 0) { //where a record is found
            data[found].status = "Sixth Form"; //change the status to sixth form
        }
    }

    fs.writeFileSync(filePath, JSON.stringify(data), "utf8");

});



