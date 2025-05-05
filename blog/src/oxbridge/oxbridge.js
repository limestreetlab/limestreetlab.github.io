/*
script for displaying oxbridge admission stats collected from a data file
*/

const dataFile = "../data/oxbridge/data.json"; //master data file, json format with stats as array of objects, a school per obj

//wrap things in document.ready
$(document).ready( () => {
  
    rank($("#rank-by").val(), $("#university").val(), $("#year").val(), $("#school-type").val());

    //when droplist changes, re-call function
    $("#university").change( () => {
        rank($("#rank-by").val(), $("#university").val(), $("#year").val(), $("#school-type").val());
    }); 
    $("#year").change( () => {
        rank($("#rank-by").val(), $("#university").val(), $("#year").val(), $("#school-type").val());
    }); 
    $("#school-type").change( () => {
        rank($("#rank-by").val(), $("#university").val(), $("#year").val(), $("#school-type").val());
    }); 
  
});//end of document.ready wrapper

/*
function to fetch data, organise data, display data as table
*/
function rank(by, university, year, status) {

    let token1;
    let token2;
    let token3;

    token1 = university;
    switch(by) {
        case "offers":
          token2 = "offer";
          break;
        case "offer rate":
          token2 = "success";
          break;
    }
    token3 = year;

    const key = token1 + "_" + token2 + "_" + token3; //json data format is university_offer_year
    const filter = status;

    fetch(dataFile)
    .then(streamData => streamData.json()) //parse response stream to JSON
    .then((jsonData) => {
        const filteredData = jsonData.filter( filterSchool ); 
        const sortedData = filteredData.sort( compareOffer );
        const html = generateTableHTML(sortedData, 35); //2nd param is the max rank to show, but usually below if 3 is hit
        createTable(html);
    });

    function generateTableHTML(inputData, number) { //2nd param is the max rank to show, but usually below if 3 is hit

        let data = inputData;
        let html = "<thead><tr><th scope='col'>#</th><th scope='col'>School</th><th scope='col'>Status</th><th scope='col'>Oxbridge #</th><th scope='col'>Oxbridge %</th><th scope='col'>Cambridge #</th><th scope='col'>Cambridge %</th><th scope='col'>Oxford #</th><th scope='col'>Oxford %</th></tr></thead><tbody>";
        
        let i = 0; //var increments by 1 to trapass data
        let rank = i; //var might not increment if tied
        while (rank < number) {
            let col1 = data[i].school;
            let col2 = data[i].status;
            let col3 = data[i]["oxbridge_offer_" + year];
            let col4 = data[i]["oxbridge_success_" + year];
            let col5 = data[i]["cambridge_offer_" + year];
            let col6 = data[i]["cambridge_success_" + year];
            let col7 = data[i]["oxford_offer_" + year];
            let col8 = data[i]["oxford_success_" + year];

            let row = `<tr><td>${rank+1}</td><td>${col1}</td><td>${col2}</td><td align="center">${col3}</td><td align="center">${col4}</td><td align="center">${col5}</td><td align="center">${col6}</td><td align="center">${col7}</td><td align="center">${col8}</td></tr>`;
            html = html.concat(row);

            if (data[i+1][key] === "<3") { //when the next in line is under 3
                break; //stop ranking as next is under 3
            } else {
                if ( parseInt(data[i][key]) > parseInt(data[i+1][key]) ) { //when next in line is >= 3 and lower than current iteration value
                    rank++; //increment the ranking by 1
                }    
            }
            i++;        

        }

        return html;
    }

    function createTable(html) {
        $("#league-table").html(html);
    }

    //function as input for sorting offers in descending order
    function compareOffer( {[key]: a}, {[key]: b} ) {
        if (a === "<3") {
            a = 0;
        }
        if (b === "<3") {
            b = 0;
        }
    
        return Number(b) - Number(a);
    }

    function filterSchool(element) {
        if (filter !== "all") { //a particular school type is selected, show only that selection
            return element.status.toLowerCase() === filter; 
        } else { // all is selected, show public and private (6th form colleges are not shown)
            return (element.status.toLowerCase() === "private" || element.status.toLowerCase() === "public"); 
        }
    }
    
}






