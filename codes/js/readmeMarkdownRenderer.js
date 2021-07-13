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

    $.get('readme/pdf-title-parser.md', pdfTitleParserReadme, "text");
    function pdfTitleParserReadme(contents) {
      var readme = $.trim(contents);
      $('#pdf-title-parser-readme').html(marked(readme)) ;
    }

    $.get('readme/id-data-downloader.md', ibDataDownloaderReadme, "text");
    function ibDataDownloaderReadme(contents) {
      var readme = $.trim(contents);
      $('#ib-data-downloader-readme').html(marked(readme)) ;
    }

    $.get('readme/wasabi.md', wasabiReadme, "text");
    function wasabiReadme(contents) {
      var readme = $.trim(contents);
      $('#wasabi-readme').html(marked(readme)) ;
    }

    $.get('readme/oh-my-notes.md', ohMyNotesReadme, "text");
    function ohMyNotesReadme(contents) {
      var readme = $.trim(contents);
      $('#oh-my-notes-readme').html(marked(readme)) ;
    }

    $.get('readme/octave-statistical-tests.md', octaveStatisticalTestsReadme, "text");
    function octaveStatisticalTestsReadme(contents) {
      var readme = $.trim(contents);
      $('#octave-statistical-tests-readme').html(marked(readme)) ;
    }
    
    $.get('readme/pychartist.md', pychartistReadme, "text");
    function pychartistReadme(contents) {
      var readme = $.trim(contents);
      $('#pychartist-readme').html(marked(readme)) ;
    }

    $.get('readme/sally-utility.md', sallyUtilityReadme, "text");
    function sallyUtilityReadme(contents) {
      var readme = $.trim(contents);
      $('#sally-utility-readme').html(marked(readme)) ;
    }
    
    $.get('readme/excel-adf.md', excelAdfReadme, "text");
    function excelAdfReadme(contents) {
      var readme = $.trim(contents);
      $('#excel-adf-readme').html(marked(readme)) ;
    }



 
    
  });