//const fs = require("fs");

const dataFile = "../data/oxbridge/data.json";

//wrap things in document.ready
$(document).ready( () => {
  
    rank($("#rank-by").val(), $("#university").val(), $("#year").val(), $("#school-type").val());

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

    const key = token1 + "_" + token2 + "_" + token3;
    const filter = status;

    fetch(dataFile)
    .then(streamData => streamData.json()) //parse response stream to JSON
    .then((jsonData) => {
        const filteredData = jsonData.filter( filterSchool ); 
        const sortedData = filteredData.sort( compareOffer );
        const html = generateTableHTML(sortedData, 50);
        createTable(html);
    });

    function generateTableHTML(inputData, number) {

        let data = inputData.slice(0, number);
        let html = "<thead><tr><th scope='col'>#</th><th scope='col'>School</th><th scope='col'>Status</th><th scope='col'>Oxbridge #</th><th scope='col'>Oxbridge %</th><th scope='col'>Cambridge #</th><th scope='col'>Cambridge %</th><th scope='col'>Oxford #</th><th scope='col'>Oxford %</th></tr></thead><tbody>";
        
        for (let i = 0; i < data.length; i++) {
            let col1 = data[i].school;
            let col2 = data[i].status;
            let col3 = data[i]["oxbridge_offer_" + year];
            let col4 = data[i]["oxbridge_success_" + year];
            let col5 = data[i]["cambridge_offer_" + year];
            let col6 = data[i]["cambridge_success_" + year];
            let col7 = data[i]["oxford_offer_" + year];
            let col8 = data[i]["oxford_success_" + year];

            let row = `<tr><td>${i+1}</td><td>${col1}</td><td>${col2}</td><td align="center">${col3}</td><td align="center">${col4}</td><td align="center">${col5}</td><td align="center">${col6}</td><td align="center">${col7}</td><td align="center">${col8}</td></tr>`;
            html = html.concat(row);
        }

        return html;
    }

    function createTable(html) {
        $("#league-table").html(html);
    }

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
        if (filter !== "all") {
            return element.status.toLowerCase() === filter; 
        } else {
            return true;
        }
    }
    
}






