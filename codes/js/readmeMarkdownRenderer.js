//script to render readme files written in markdown using marked.js
//it works by
// - getting the readme file in the readme folder and then callback
// - the callback trims the file content, then render it to the relevant display area
$(document).ready(
  function() {
    
    $.get('readme/chachachat.md', chachachatReadme, "text");
    function chachachatReadme(contents) {
      var readme = $.trim(contents);
      $('#chachachat-readme').html(marked(readme)) ;
    }

 
    
  });