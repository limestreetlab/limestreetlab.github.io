$(document).ready( () => {
    
    const weights = [0.3, 0.05, 0.15, 0.05, 0.2, 0.10, 0.05, 0.1]; //weights to corresponding categories in %

    let chartParams = {

        chart: {
            polar: true,
            type: 'area'
        },

        xAxis: {
            categories: [
                'Academics', 'Placements', 'Music',
                'Sports', 'Languages', 'Facilities', 'Location', 'Cost'
            ],
            tickmarkPlacement: 'on',
            lineWidth: 0
        },

        yAxis: {
            gridLineInterpolation: 'polygon',
            lineWidth: 0,
            min: 0,
            max: 10,
            tickInterval: 10,
            labels: {enabled: false}
            },


        title: {
            text: ''    
        },
        
        legend: {
            enabled: false
        },
        
        credits: {
            enabled: false
        } 

    };
    
    //holy cross
    chartParams.series = [{
        name: 'score',
        pointPlacement: 'on',
        data: [7, 7, 7, 8, 5, 10, 7, 8]
    }];
    chartParams.title.text = "Holy Cross";
    Highcharts.chart('holycross', chartParams);
    
    //newton
    chartParams.series = [{
        name: 'score',
        pointPlacement: 'on',
        data: [7, 7, 7, 7, 5, 9, 4, 5]
    }];
    chartParams.title.text = "Newton";
    Highcharts.chart('newton', chartParams);

    //bute house
    chartParams.series = [{
        name: 'score',
        pointPlacement: 'on',
        data: [10, 10, 8, 7, 6, 8, 8, 5]
    }];
    chartParams.title.text = "Bute House";
    Highcharts.chart('butehouse', chartParams);

    //cfbl
    chartParams.series = [{
        name: 'score',
        pointPlacement: 'on',
        data: [6, 4, 6, 5, 9, 6, 5, 8]
    }];
    chartParams.title.text = "College Francais Bilingue de Londres";
    Highcharts.chart('cfbl', chartParams);

    //ecole battersea
    chartParams.series = [{
        name: 'score',
        pointPlacement: 'on',
        data: [5, 5, 3, 3, 9, 3, 3, 8]
    }];
    chartParams.title.text = "Ecole de Battersea";
    Highcharts.chart('ecoledebattersea', chartParams);

    //jeannine manuel
    chartParams.series = [{
        name: 'score',
        pointPlacement: 'on',
        data: [7, 6, 7, 5, 10, 6, 8, 5]
    }];
    chartParams.title.text = "Ecole Jeannine Manuel";
    Highcharts.chart('jeanninemanuel', chartParams);

    //glendower
    chartParams.series = [{
        name: 'score',
        pointPlacement: 'on',
        data: [0, 0, 0, 0, 0, 0, 9, 0]
    }];
    chartParams.title.text = "Glendower";
    Highcharts.chart('glendower', chartParams);

    //pembridge hall
    chartParams.series = [{
        name: 'score',
        pointPlacement: 'on',
        data: [0, 0, 0, 0, 0, 0, 9, 0]
    }];
    chartParams.title.text = "Pembridge Hall";
    Highcharts.chart('pembridgehall', chartParams);

    //kensington prep
    chartParams.series = [{
        name: 'score',
        pointPlacement: 'on',
        data: [0, 0, 0, 0, 0, 0, 0, 0]
    }];
    chartParams.title.text = "Kensington Prep";
    Highcharts.chart('kensingtonprep', chartParams);

    //kensington wade
    chartParams.series = [{
        name: 'score',
        pointPlacement: 'on',
        data: [0, 0, 0, 0, 9, 0, 0, 4]
    }];
    chartParams.title.text = "Kensington Wade";
    Highcharts.chart('kensingtonwade', chartParams);

    //knightbridge school
    chartParams.series = [{
        name: 'score',
        pointPlacement: 'on',
        data: [0, 0, 0, 0, 0, 0, 8, 2]
    }];
    chartParams.title.text = "Knightbridge School";
    Highcharts.chart('knightbridge', chartParams);

    //hill house
    chartParams.series = [{
        name: 'score',
        pointPlacement: 'on',
        data: [0, 0, 0, 0, 0, 0, 8, 6]
    }];
    chartParams.title.text = "Hill House";
    Highcharts.chart('hillhouse', chartParams);

    //brighton college
    chartParams.series = [{
        name: 'score',
        pointPlacement: 'on',
        data: [0, 0, 0, 0, 0, 0, 9, 2]
    }];
    chartParams.title.text = "Brighton College Prep Kensington";
    Highcharts.chart('brightoncollegeprep', chartParams);

    //eaton house
    chartParams.series = [{
        name: 'score',
        pointPlacement: 'on',
        data: [0, 0, 0, 0, 0, 0, 8, 4]
    }];
    chartParams.title.text = "Eaton House Manor";
    Highcharts.chart('eatonhouse', chartParams);

    //kew college
    chartParams.series = [{
        name: 'score',
        pointPlacement: 'on',
        data: [0, 0, 0, 0, 0, 0, 0, 8]
    }];
    chartParams.title.text = "Kew College";
    Highcharts.chart('kewcollege', chartParams);

    //kings house
    chartParams.series = [{
        name: 'score',
        pointPlacement: 'on',
        data: [0, 0, 0, 0, 0, 0, 0, 6]
    }];
    chartParams.title.text = "King's House";
    Highcharts.chart('kingshouse', chartParams);

    //devonshire
    chartParams.series = [{
        name: 'score',
        pointPlacement: 'on',
        data: [0, 0, 0, 0, 0, 0, 7, 0]
    }];
    chartParams.title.text = "Devonshire House";
    Highcharts.chart('devonshirehouse', chartParams);

    //st pauls cathedral
    chartParams.series = [{
        name: 'score',
        pointPlacement: 'on',
        data: [0, 0, 0, 0, 0, 0, 7, 6]
    }];
    chartParams.title.text = "St Paul's Cathedral School";
    Highcharts.chart('stpaulscathedral', chartParams);

    //garden house
    chartParams.series = [{
        name: 'score',
        pointPlacement: 'on',
        data: [0, 0, 0, 0, 0, 0, 0, 4]
    }];
    chartParams.title.text = "Garden House";
    Highcharts.chart('gardenhouse', chartParams);

    //merlin school
    chartParams.series = [{
        name: 'score',
        pointPlacement: 'on',
        data: [0, 0, 0, 0, 0, 0, 0, 7]
    }];
    chartParams.title.text = "Merlin";
    Highcharts.chart('merlin', chartParams);

  
  
});//end of document.ready wrapper
