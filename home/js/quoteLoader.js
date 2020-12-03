//script to randomly pick a quote and load it into the landing page
$(document).ready(function() {

  //the quote collection by ["said what", "by whom"]
  var quotes = [
    ["The greatest enemy of knowledge is not ignorance, it is the illusion of knowledge.", "Stephen Hawking"],
    ["It always seems impossible until it's done.", "Nelson Mandela"],
    ["Discovering the unexpected is more important than confirming the known.", "George Box"],
    ["I learned very early the difference between knowing the name of something and knowing something.", "Richard Feynman"],
    ["Any fool can know. The point is to understand.", "Albert Einstein"],
    ["The true sign of intelligence is not knowledge but imagination.", "Albert Einstein"],
    ["Live as if you were to die tomorrow. Learn as if you were to live forever.", "Mahatma Gandhi"],
    ["Intellectual growth should commence at birth and cease only at death.", "Albert Einstein"],
    ["Motivation is what sets you in motion, habit is what keeps you going.", "Jim Ryun"],
    ["Life is like riding a bicycle. To keep your balance, you must keep moving.", "Albert Einstein"],
    ["The expert at anything was once a beginner.", "Helen Hayes"],
    ["Nobody ever figures out what life is all about, and it doesn't matter. Explore the world. Nearly everything is really interesting if you go into it deeply enough.", "Richard Feynman"],
    ["I'd rather regret the things I've done than regret the things I haven't done.", "Lucille Ball"],
    ["The first principle is that you must not fool yourself and you are the easiest person to fool.", "Richard Feynman"],
    ["Be less curious about people and more curious about ideas.", "Marie Curie"],
    ["I would prefer an intelligent hell to a stupid paradise.", "Blaise Pascal"],
    ["Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.", "Albert Einstein"],
    ["I'll take crazy over stupid any day.", "Joss Whedon"],
    ["The two most common elements in the universe are hydrogen and stupidity.", "Harlan Ellison"],
    ["I'm allergic to stupidity.", "Chris Colfer"],
    ["The great mistake made by intelligent people is to refuse to believe that the world is as stupid as it is.", "Claudine Guerin de Tencin"],
    ["Life is hard, but it's harder if you're stupid.", "John Michael Crichton"],
    ["The universe consists of 5% protons, 5% neutrons, 5% electrons and 85% morons.", "Frank Zappa"],
    ["The modern society is full of smart phones and stupid people.", "Tiger Tanaka"],
    ["The best solution to human overpopulation is to make stupidity punishable by death.","Tiger Tanaka"],
    ["Stupidity is the most widespread virus. We're living in the stupidity pandemic.","Tiger Tanaka"],
    ["Talk sense to a fool and he calls you foolish.", "Euripides"],
    ["Have the courage to follow your heart and intuition. They somehow know what you truly want to become.", "Steve Jobs"]

    

  ];

  var quoteSlot = document.querySelector("#quote"); //select the quote element
  var quoteBySlot = document.querySelector("#quote-by"); //select the by-whom element
  var quoteNumber= Math.floor(Math.random() * quotes.length); //get a random quote to retrieve

  quoteSlot.textContent = quotes[quoteNumber][0]; //populating the element by a random quote
  quoteBySlot.textContent = quotes[quoteNumber][1];

}
);