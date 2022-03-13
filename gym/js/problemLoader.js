/*
script to load questions into the mental gym page
problems are separated by subjects as folders and each folder contains a problem per file
the script randomly picks a subject and then a question number
it then load the picked question file as well as calling MathJax to parse Latex
*/

$(document).ready( function() {
  
  //list of subjects to draw the question from; elements must reflect questions directory structure
  const questionSubject = ["calculus", "probability"];
  //total number of available questions, positions directly correspond to subjects, should be updated as questions are added
  const questionsAvailable = [17, 42]; //exact number of question files in each directory

    //codes hereafter need no maintenance
    let numberOfSubjects = questionSubject.length; 
    let subjectNumber = Math.floor(Math.random() * numberOfSubjects); //randomly picking a subject
    let thisSubject = questionSubject[subjectNumber]; //the randomly picked subject
    
    let questionNumber = Math.floor(Math.random() * questionsAvailable[subjectNumber]); //randomly picked question number
    questionNumber = questionNumber.toString(); //cast int to string

    let thisQuestion = "./problems/" + thisSubject + "/" + thisSubject + "-" + questionNumber + ".html" + " #problem"; //string of filepath and the question id element
    let thisAnswer   = "./problems/" + thisSubject + "/" + thisSubject + "-" + questionNumber + ".html" + " #solution"; //string of filepath and the answer id element

    $("#question").load(thisQuestion, function(){MathJax.typeset();});  //load the path for problem
    $("#answer").load(thisAnswer, function(){MathJax.typeset();} );  //load the path for answer and then callback MathJax.typeset() to re-typeset the LaTeX math

});
