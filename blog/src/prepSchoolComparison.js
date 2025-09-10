$(document).ready( () => {

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
    
    
    //holycross
    const holycross_score = [7, 7, 7, 7, 5, 10, 6, 7]; //assigned score to [academics, placements, music, sports, lang, facility, location, cost]
    const holycross_overall_score = dot(holycross_score, weights); //overall score
    chartParams.series = [{
        name: 'score',
        pointPlacement: 'on',
        data: holycross_score
    }];
    Highcharts.chart('holycross_chart', chartParams); //plot chart
    $("#holycross_score").text(holycross_overall_score); //show score
    
    //newton
    const newton_score = [7, 7, 7, 7, 5, 9, 4, 3]; //assigned score to [academics, placements, music, sports, lang, facility, location, cost]
    const newton_overall_score = dot(newton_score, weights); //overall score
    chartParams.series = [{
        name: 'score',
        pointPlacement: 'on',
        data: newton_score
    }];
    Highcharts.chart('newton_chart', chartParams); //plot chart
    $("#newton_score").text(newton_overall_score); //show score
    

    //bute house
    const butehouse_score = [10, 10, 8, 7, 7, 9, 8, 1]; //assigned score to [academics, placements, music, sports, lang, facility, location, cost]
    const butehouse_overall_score = dot(butehouse_score, weights); //overall score
    chartParams.series = [{
        name: 'score',
        pointPlacement: 'on',
        data: butehouse_score
    }];
    Highcharts.chart('butehouse_chart', chartParams); //plot chart
    $("#butehouse_score").text(butehouse_overall_score); //show score

    //cfbl
    const cfbl_score = [5, 4, 5, 5, 9, 5, 3, 8]; //assigned score to [academics, placements, music, sports, lang, facility, location, cost]
    const cfbl_overall_score = dot(cfbl_score, weights); //overall score
    chartParams.series = [{
        name: 'score',
        pointPlacement: 'on',
        data: cfbl_score
    }];
    Highcharts.chart('cfbl_chart', chartParams); //plot chart
    $("#cfbl_score").text(cfbl_overall_score); //show score

    //ecole de battersea
    const ecoledebattersea_score = [5, 5, 3, 3, 9, 3, 3, 7]; //assigned score to [academics, placements, music, sports, lang, facility, location, cost]
    const ecoledebattersea_overall_score = dot(ecoledebattersea_score, weights); //overall score
    chartParams.series = [{
        name: 'score',
        pointPlacement: 'on',
        data: ecoledebattersea_score
    }];
    Highcharts.chart('ecoledebattersea_chart', chartParams); //plot chart
    $("#ecoledebattersea_score").text(ecoledebattersea_overall_score); //show score

    //ecole des petits
    const ecoledespetits_score = [6, 5, 3, 4, 10, 6, 7, 7]; //assigned score to [academics, placements, music, sports, lang, facility, location, cost]
    const ecoledespetits_overall_score = dot(ecoledespetits_score, weights); //overall score
    chartParams.series = [{
        name: 'score',
        pointPlacement: 'on',
        data: ecoledespetits_score
    }];
    Highcharts.chart('ecoledespetits_chart', chartParams); //plot chart
    $("#ecoledespetits_score").text(ecoledespetits_overall_score); //show score
    

    //jeannine manuel
    const jeanninemanuel_score = [7, 6, 6, 5, 10, 6, 7, 2]; //assigned score to [academics, placements, music, sports, lang, facility, location, cost]
    const jeanninemanuel_overall_score = dot(jeanninemanuel_score, weights); //overall score
    chartParams.series = [{
        name: 'score',
        pointPlacement: 'on',
        data: jeanninemanuel_score
    }];
    Highcharts.chart('jeanninemanuel_chart', chartParams); //plot chart
    $("#jeanninemanuel_score").text(jeanninemanuel_overall_score); //show score

    //glendower
    const glendower_score = [9, 9, 7, 6, 7, 6, 9, 1]; //assigned score to [academics, placements, music, sports, lang, facility, location, cost]
    const glendower_overall_score = dot(glendower_score, weights); //overall score
    chartParams.series = [{
        name: 'score',
        pointPlacement: 'on',
        data: glendower_score
    }];
    Highcharts.chart('glendower_chart', chartParams); //plot chart
    $("#glendower_score").text(glendower_overall_score); //show score

    //pembridge hall
    const pembridgehall_score = [8, 8, 7, 6, 6, 6, 9, 1]; //assigned score to [academics, placements, music, sports, lang, facility, location, cost]
    const pembridgehall_overall_score = dot(pembridgehall_score, weights); //overall score
    chartParams.series = [{
        name: 'score',
        pointPlacement: 'on',
        data: pembridgehall_score
    }];
    Highcharts.chart('pembridgehall_chart', chartParams); //plot chart
    $("#pembridgehall_score").text(pembridgehall_overall_score); //show score

    //kensington prep
    const kensingtonprep_score = [9, 9, 8, 6, 5, 7, 8, 3]; //assigned score to [academics, placements, music, sports, lang, facility, location, cost]
    const kensingtonprep_overall_score = dot(kensingtonprep_score, weights); //overall score
    chartParams.series = [{
        name: 'score',
        pointPlacement: 'on',
        data: kensingtonprep_score
    }];
    Highcharts.chart('kensingtonprep_chart', chartParams); //plot chart
    $("#kensingtonprep_score").text(kensingtonprep_overall_score); //show score

    //kensington wade
    const kensingtonwade_score = [7, 7, 5, 4, 9, 2, 6, 2]; //assigned score to [academics, placements, music, sports, lang, facility, location, cost]
    const kensingtonwade_overall_score = dot(kensingtonwade_score, weights); //overall score
    chartParams.series = [{
        name: 'score',
        pointPlacement: 'on',
        data: kensingtonwade_score
    }];
    Highcharts.chart('kensingtonwade_chart', chartParams); //plot chart
    $("#kensingtonwade_score").text(kensingtonwade_overall_score); //show score

    //knightsbridge school
    const knightsbridge_score = [7, 5, 6, 5, 6, 7, 8, 0]; //assigned score to [academics, placements, music, sports, lang, facility, location, cost]
    const knightsbridge_overall_score = dot(knightsbridge_score, weights); //overall score
    chartParams.series = [{
        name: 'score',
        pointPlacement: 'on',
        data: knightsbridge_score
    }];
    Highcharts.chart('knightsbridge_chart', chartParams); //plot chart
    $("#knightsbridge_score").text(knightsbridge_overall_score); //show score


    //hill house
    const hillhouse_score = [7, 6, 8, 6, 5, 5, 8, 6]; //assigned score to [academics, placements, music, sports, lang, facility, location, cost]
    const hillhouse_overall_score = dot(hillhouse_score, weights); //overall score
    chartParams.series = [{
        name: 'score',
        pointPlacement: 'on',
        data: hillhouse_score
    }];
    Highcharts.chart('hillhouse_chart', chartParams); //plot chart
    $("#hillhouse_score").text(hillhouse_overall_score); //show score
   
    //brighton college
    const brightoncollege_score = [5, 4, 5, 5, 4, 6, 9, 1]; //assigned score to [academics, placements, music, sports, lang, facility, location, cost]
    const brightoncollege_overall_score = dot(brightoncollege_score, weights); //overall score
    chartParams.series = [{
        name: 'score',
        pointPlacement: 'on',
        data: brightoncollege_score
    }];
    Highcharts.chart('brightoncollege_chart', chartParams); //plot chart
    $("#brightoncollege_score").text(brightoncollege_overall_score); //show score

    //eaton house
    const eatonhouse_score = [7, 7, 6, 5, 4, 4, 8, 5]; //assigned score to [academics, placements, music, sports, lang, facility, location, cost]
    const eatonhouse_overall_score = dot(eatonhouse_score, weights); //overall score
    chartParams.series = [{
        name: 'score',
        pointPlacement: 'on',
        data: eatonhouse_score
    }];
    Highcharts.chart('eatonhouse_chart', chartParams); //plot chart
    $("#eatonhouse_score").text(eatonhouse_overall_score); //show score

    //kew college
    const kewcollege_score = [8, 8, 7, 6, 5, 6, 8, 7]; //assigned score to [academics, placements, music, sports, lang, facility, location, cost]
    const kewcollege_overall_score = dot(kewcollege_score, weights); //overall score
    chartParams.series = [{
        name: 'score',
        pointPlacement: 'on',
        data: kewcollege_score
    }];
    Highcharts.chart('kewcollege_chart', chartParams); //plot chart
    $("#kewcollege_score").text(kewcollege_overall_score); //show score

    //kings house
    const kingshouse_score = [8, 7, 7, 7, 5, 8, 8, 6]; //assigned score to [academics, placements, music, sports, lang, facility, location, cost]
    const kingshouse_overall_score = dot(kingshouse_score, weights); //overall score
    chartParams.series = [{
        name: 'score',
        pointPlacement: 'on',
        data: kingshouse_score
    }];
    Highcharts.chart('kingshouse_chart', chartParams); //plot chart
    $("#kingshouse_score").text(kingshouse_overall_score); //show score

    //devonshire house
    const devonshirehouse_score = [6, 6, 6, 6, 6, 9, 8, 1]; //assigned score to [academics, placements, music, sports, lang, facility, location, cost]
    const devonshirehouse_overall_score = dot(devonshirehouse_score, weights); //overall score
    chartParams.series = [{
        name: 'score',
        pointPlacement: 'on',
        data: devonshirehouse_score
    }];
    Highcharts.chart('devonshirehouse_chart', chartParams); //plot chart
    $("#devonshirehouse_score").text(devonshirehouse_overall_score); //show score
    

    //st pauls cathedral
    const stpaulscathedral_score = [6, 6, 9, 4, 5, 5, 8, 6]; //assigned score to [academics, placements, music, sports, lang, facility, location, cost]
    const stpaulscathedral_overall_score = dot(stpaulscathedral_score, weights); //overall score
    chartParams.series = [{
        name: 'score',
        pointPlacement: 'on',
        data: stpaulscathedral_score
    }];
    Highcharts.chart('stpaulscathedral_chart', chartParams); //plot chart
    $("#stpaulscathedral_score").text(stpaulscathedral_overall_score); //show score

    //merlin school
    const merlin_score = [7, 6, 6, 5, 5, 6, 7, 7]; //assigned score to [academics, placements, music, sports, lang, facility, location, cost]
    const merlin_overall_score = dot(merlin_score, weights); //overall score
    chartParams.series = [{
        name: 'score',
        pointPlacement: 'on',
        data: merlin_score
    }];
    Highcharts.chart('merlin_chart', chartParams); //plot chart
    $("#merlin_score").text(merlin_overall_score); //show score

    //hampstead hill
    const hampsteadhill_score = [9, 8, 2, 3, 3, 3, 8, 5]; //assigned score to [academics, placements, music, sports, lang, facility, location, cost]
    const hampsteadhill_overall_score = dot(hampsteadhill_score, weights); //overall score
    chartParams.series = [{
        name: 'score',
        pointPlacement: 'on',
        data: hampsteadhill_score
    }];
    Highcharts.chart('hampsteadhill_chart', chartParams); //plot chart
    $("#hampsteadhill_score").text(hampsteadhill_overall_score); //show score

    //mulberry
    const mulberry_score = [9, 8, 4, 4, 4, 5, 5, 3]; //assigned score to [academics, placements, music, sports, lang, facility, location, cost]
    const mulberry_overall_score = dot(mulberry_score, weights); //overall score
    chartParams.series = [{
        name: 'score',
        pointPlacement: 'on',
        data: mulberry_score
    }];
    Highcharts.chart('mulberry_chart', chartParams); //plot chart
    $("#mulberry_score").text(mulberry_overall_score); //show score

    //roche
    const roche_score = [6, 6, 5, 5, 8, 4, 4, 7]; //assigned score to [academics, placements, music, sports, lang, facility, location, cost]
    const roche_overall_score = dot(roche_score, weights); //overall score
    chartParams.series = [{
        name: 'score',
        pointPlacement: 'on',
        data: roche_score
    }];
    Highcharts.chart('roche_chart', chartParams); //plot chart
    $("#roche_score").text(roche_overall_score); //show score

    //westminster
    const westminster_score = [10, 10, 8, 8, 7, 8, 8, 1]; //assigned score to [academics, placements, music, sports, lang, facility, location, cost]
    const westminster_overall_score = dot(westminster_score, weights); //overall score
    chartParams.series = [{
        name: 'score',
        pointPlacement: 'on',
        data: westminster_score
    }];
    Highcharts.chart('westminster_chart', chartParams); //plot chart
    $("#westminster_score").text(westminster_overall_score); //show score

    //wimbledon common
    const wimbledoncommon_score = [9, 9, 6, 5, 5, 6, 7, 6]; //assigned score to [academics, placements, music, sports, lang, facility, location, cost]
    const wimbledoncommon_overall_score = dot(wimbledoncommon_score, weights); //overall score
    chartParams.series = [{
        name: 'score',
        pointPlacement: 'on',
        data: wimbledoncommon_score
    }];
    Highcharts.chart('wimbledoncommon_chart', chartParams); //plot chart
    $("#wimbledoncommon_score").text(wimbledoncommon_overall_score); //show score



});//end of document.ready wrapper

const weights = [0.30, 0.05, 0.15, 0.05, 0.20, 0.10, 0.05, 0.10]; //weights to corresponding categories in %, sum to 100%
//helper function to calculate the dot product of two arrays of equal lengths
function dot(x, y) {
    let multipliedArray = x.map((v, i) => x[i] * y[i]); //scalar multiplication of array elements
    let sum = multipliedArray.reduce((m, n) => m + n); //sum over the elements
    return sum.toFixed(1); //return rounded value
}
