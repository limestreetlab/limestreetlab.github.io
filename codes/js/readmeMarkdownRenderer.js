//script to render readme files written in markdown using marked.js
//it works by
// - getting the readme file in the readme folder and pass it to a callback
// - the callback renders the readme string to the relevant display area
// - the callback uses Marked.js to render the markdown string by calling marked.parse(markdown string)

$(document).ready(

  function() {
    
    $.get('readme/chachachat.md', (readme) => $('#chachachat-readme').html(marked.parse(readme)), "text");

    $.get('readme/pdf-title-parser.md', (readme) => $('#pdf-title-parser-readme').html(marked.parse(readme)), "text");

    $.get('readme/id-data-downloader.md', (readme) => $('#ib-data-downloader-readme').html(marked.parse(readme)), "text");

    $.get('readme/saorio.md', (readme) => $('#saorio-readme').html(marked.parse(readme)), "text");

    $.get('readme/oh-my-notes.md', (readme) => $('#oh-my-notes-readme').html(marked.parse(readme)), "text");

    $.get('readme/octave-statistical-tests.md', (readme) => $('#octave-statistical-tests-readme').html(marked.parse(readme)), "text");
    
    $.get('readme/tata.md', (readme) => $('#tata-readme').html(marked.parse(readme)), "text");

    $.get('readme/sally-utility.md', (readme) => $('#sally-utility-readme').html(marked.parse(readme)), "text");
    
    $.get('readme/excel-adf.md', (readme) => $('#excel-adf-readme').html(marked.parse(readme)), "text");
    
    $.get('readme/binomial-tree.md', (readme) => $('#binomial-tree-readme').html(marked.parse(readme)), "text");


 
    }

  );