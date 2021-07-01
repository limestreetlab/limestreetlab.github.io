import sys
from pdfminer.high_level import extract_pages
from pdfminer.layout import LTTextContainer, LTLine, LTChar



def getTitle(filepath):
    """method to extract the title of a pdf file"""
  
    try:
        filepath = filepath.strip()
    except TypeError:
        print("filepath not a string")
   
    if not filepath[len(filepath)-4:len(filepath)] == ".pdf":
        sys.exit("filepath not ending with .pdf")
      
    
    data = extractFirstPageElements(filepath)
    texts = data[0]
    fonts = data[1]

    if len(texts) == 0: #in case no text is read, either the texts are not readable or first page is blank
        title = "unknown title"
    else:
        maxFontPos = extractTitlePos(fonts)
        uncleanedTitle = extractTitle(texts, maxFontPos)
        title = cleanTitle(uncleanedTitle)
    
    return title


def extractFirstPageElements(filepath):
    """helper method to extract text elements and their corresponding font sizes into lists"""

    fonts = []
    elements = []
    for page in extract_pages(filepath):
        for element in page:
            if isinstance(element, LTTextContainer):
                for text_line in element:
                    for character in text_line:
                        if isinstance(character, LTChar):
                            font_size = character.size
                            break #first character only, assuming others in text_line have the same size
                fonts.append(font_size)
                elements.append(element.get_text())
        break #read first page only
    return [elements, fonts]


def extractTitlePos(fonts):
    """helper method to extract the positions having the largest font size"""
    font_pos = []
    maxFont = max(fonts)
    for pos, size in enumerate(fonts):
        if size == maxFont:
            font_pos.append(pos)
    return font_pos


def extractTitle(elements, positions):
    """helper method to extract those elements having the largest font size, then return as a joint string"""
    title = []
    for i in positions:
        title.append(elements[i])
    return "".join(title)


def cleanTitle(title):
    """helper method to clean the title by removing \n and illegal filename symbols"""
    
    englishArticles = ("A", "An", "The") #to remove if start word of title
    
    title = title.strip() #remove whitespaces
    title = title.replace("\n", " ") #remove any inline \n
    title = title.replace(":", " -") #replace invalid filename : symbol
    title = title.replace("?", " ") #replace invalid filename ? symbol
    title = title.replace("*", "") #replace invalid filename * symbol
    title = title.replace("  ", " ") #remove potential double whitespaces
    title = title.title() #capitalize every word in the title
    
    firstWord = title.split()[0] #first word of title
    if firstWord in englishArticles:
        secondWord = title.split()[1] #second word of title
        secondWordPos = title.index(secondWord)
        title = title[secondWordPos:] #remove the starting article off title   
   
    return title

if __name__ == "__main__":
    filepath = input("Enter the file path (using /): ")
    print(getTitle(filepath))
