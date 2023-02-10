 ![screenshot](readme/titleParser.png)
 
 While a paper's title and author are obvious to the human eyes, it is difficult to parse given the pdf file format and layout variety, without resorting to NPL.

Nonetheless, this parser is a quick and dumb attempt to parse out the title of a typical research paper.

##### How It Works
It simply assumes the title exists in the first page of the paper and that it has the largest font on that page.  
It uses *pdfminer* to identify the tokens and their associated font sizes on the first page; it then retrieves the token having the largest font size as the title.

##### Methods
getTitle(file)  
@return string; 'Unknown' if parse fails  
@param  *file*: absolute path

##### Failures
The parse can fail for myriad reasons. Apparently, if the title doesn't have the largest font size or other metadata also have the same size, then the parse will fail.  
Also, parsing can fail due to inability to properly read the file texts or the font sizes which happens rather often.  
File read permission can also prohibit parsing.

##### Dependencies
- [pdfminer](https://github.com/pdfminer/pdfminer.six)                   