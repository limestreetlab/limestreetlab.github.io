import os

#The Bootstrap-based HTML codes use an Accordion-style list to display papers
#Each paper falls under a subject
#The Bootstrap Accordion codes comprise a header for each subject, then item for each individual list item (a paper in this case), and closing tags

#codes for the header, written once for each subject
header = """
<section class="accordion-item">
<h2 class="accordion-header">
<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#{subjectId}">
{subjectName}
</button>
</h2>
<div id="{subjectId}" class="accordion-collapse collapse">
<div class="accordion-body">
<ul class="list-group list-group-flush">
 """

#codes for each list item
item = '<li class="list-group-item"><a href="{link}">{title}</a></li>\n'

#codes for the footer, written once for each subject
footer = """</ul>
</div>
</div>
</section>

"""

def addHeader(contents, subject):
    subjectId = subject.replace(" ", "")
    newContents = header.format(subjectId = subjectId, subjectName = subject)
    return contents + newContents

def addItem(contents, subject, title):
    link = "papers" + "/" + subject + "/" + title + ".pdf" #the first element should be the folder name containing the paper files
    newContents = item.format(link = link, title = title)
    return contents + newContents

def addFooter(contents):
    newContents = footer
    return contents + newContents

#main method to generate HTML codes in a target HTML file for all papers in a Bootstrap accordion style
def writeHTML(paperFilePaths, htmlFilePath):
    
    html = open(htmlFilePath, "r+", encoding="utf-8")

    htmlContents = html.readlines()
    startLine = locateWriteLine(htmlContents) #get the line number to start
        
    newContents = createHTMLContents(paperFilePaths) #get new HTML contents
    
    htmlContents.insert(startLine, newContents) #insert new contents into original contents from startLine
    htmlContentsString = "".join(htmlContents) #stringify the combined contents

    html.seek(0) #ensure the pointer at 0 for writing
    html.write(htmlContentsString) #write contents
    
    html.close()
    

def locateWriteLine(htmlContents):
    """the HTML file has other codes before the paper list codes so the appropriate start writing line has to be identified, and it is after the Bootstrap class="accordion" element"""
    lineToLocate = 'id="paperAccordion"' #element to identify for the start line
    lineNumber = 1 #line counter
    for line in htmlContents:
        if lineToLocate in line:
            break
        lineNumber += 1
    return lineNumber + 1

def createHTMLContents(papers):
    contents = ""
    lastFoldername = ""
    for paper in papers: #loop through the paper list
        filename = os.path.basename(paper) #get the file name which includes its extension
        filename = filename[0:len(filename)-4] #get rid of the .pdf extension
        foldername = os.path.basename(os.path.dirname(paper)) #get the folder name where the file is in

        if foldername != lastFoldername: #when current file is new
            
            if len(lastFoldername) > 0: #check whether this block is the first block
                contents = addFooter(contents) #write the footer for the last block if not first block
                
            contents = addHeader(contents, foldername) #write the new header for this block
        lastFoldername = foldername

        contents = addItem(contents, foldername, filename)

    #end of looping the files
    contents = addFooter(contents) #add a footer to the last block

    return contents
    
    

        
        
    


        
            
