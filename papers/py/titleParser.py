import sys
from pdfminer.high_level import extract_pages
from pdfminer.layout import LTTextContainer, LTLine, LTChar

#this module contains one public method to parse the title of a typical PDF academic paper, given its filepath
#the parsing often fails because of difficulty in parsing PDF files

def getTitle(filepath):
    """main method to extract the title of a pdf file"""
  
    try:
        filepath = filepath.strip()
    except TypeError:
        print("filepath not a string")
   
    if not filepath[len(filepath)-4:len(filepath)].lower() == ".pdf":
        sys.exit("filepath not ending with .pdf in " + filepath)
      
    try:
        data = extractFirstPageElements(filepath)
        texts = data[0]
        fonts = data[1]
        
        maxFontPos = extractTitlePos(fonts)
        uncleanedTitle = extractTitle(texts, maxFontPos)
        title = cleanTitle(uncleanedTitle)
    
    except: #mostly due to IndexError as no texts are read in due to unreadable file or blank page, or some readTexts-fontSize mismatch
        title = "Unknown"

    if len(title) > 120: #ultra-long title likely error
        title = "Unknown" 
    
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
    return " ".join(title)


def cleanTitle(title):
    """helper method to clean the title by removing \n and illegal filename symbols"""
    
    englishArticles = ("a", "an", "the") #to remove if start word of title
                
    title = title.strip() #remove whitespaces
    title = title.replace("\n", " ") #remove any inline \n
    title = title.replace(":", " -") #replace invalid file : symbol
    title = title.replace("?", " ") #replace invalid file ? symbol
    title = title.replace("*", "") #replace invalid symbol
    title = title.replace("@", "") #replace invalid symbol
    title = title.replace("/", " ") #replace invalid symbol
    title = title.replace("  ", " ") #remove potential double whitespaces
    title = title.title() #capitalize each word
    
    #remove starting article if one
    firstWord = title.split()[0].lower() #first word of title
    if firstWord in englishArticles:
        secondWord = title.split()[1] #second word of title
        secondWordPos = title.index(secondWord) #where second word starts
        title = title[secondWordPos:] #remove the starting article off title

    #perform word capitalization, some keywords are all lower-case, some words are all upper-case, regular words are letter-capitalized
    words = title.split() #individual words in the title, each letter-capitalized
    lowercaseWords = ("a", "an", "the", "at", "to", "from", "for", "using", "of", "among", "across", "during","what", "with", "and", "or", "between", "in", "on", "is", "are", "as", "there", "under", "toward", "towards", "through", "via", "by", "based", "vs", "versus", "its", "it", "their")
    uppercaseWords = ("us", "usa", "eu", "uk", "hk", "nyse", "ftse", "hkse", "pca", "etf", "etfs", "fx", "ipo", "hft", "spx", "vix", "vxx", "adr", "adrs")
    capAdjustedWords = []
    for word in words: #check each word one by one
        if word.lower() in lowercaseWords:
            capAdjustedWords.append(word.lower())
        elif word.lower() in uppercaseWords:
            capAdjustedWords.append(word.upper())
        else:
            capAdjustedWords.append(word)
    if capAdjustedWords[0].islower():
        capAdjustedWords[0] = capAdjustedWords[0].capitalize() #captailize in case first word is in lowercaseWords
    title = " ".join(capAdjustedWords)

    #often the final char is some special character so should be removed
    finalChar = title[ len(title)-1 : ]
    if not finalChar.isalnum():
        title = title[0 : len(title)-1] #remove the last char
        
    
    return title


if __name__ == "__main__":
    filepath = input("Enter the file path (using /): ")
    print(getTitle(filepath))
