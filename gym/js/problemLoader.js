$(document).ready( function() {
  
  //list of subjects to draw the question from; elements must reflect questions directory structure
  const questionSubject = ["probability"];
   //total number of available questions, positions directly correspond to subjects, should be updated as questions are added
  const questionsAvailable = [23]; //exact number of question files in each directory

    //codes hereafter need no maintenance
    var numberOfSubjects = questionSubject.length; 
    var subjectNumber = Math.floor(Math.random() * numberOfSubjects); //randomly picking a subject
    var thisSubject = questionSubject[subjectNumber]; //the randomly picked subject
    
    var questionNumber = 22//Math.floor(Math.random() * questionsAvailable[subjectNumber]); //randomly picked question number
    questionNumber = questionNumber.toString(); //cast int to string

    var thisQuestion = "./problems/" + thisSubject + "/" + thisSubject + "-" + questionNumber + ".html" + " #problem"; //string of filepath and the question id element
    var thisAnswer   = "./problems/" + thisSubject + "/" + thisSubject + "-" + questionNumber + ".html" + " #solution"; //string of filepath and the answer id element

    $("#question").load(thisQuestion, function(){MathJax.typeset();});  //load the path for problem
    $("#answer").load(thisAnswer, function(){MathJax.typeset();} );  //load the path for answer and then callback MathJax.typeset() to re-typeset the LaTeX math

});
