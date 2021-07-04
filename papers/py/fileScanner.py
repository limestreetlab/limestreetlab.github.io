import os


def getDirectories(path):
    """scan the input path and return its directories in a list, assumed no nested directories"""
    d = []
    directories = os.scandir(path)
    for directory in directories:
        if directory.is_dir():
                d.append( os.path.join(path, directory) )
    return d

def getFiles(directory):
    """scan a directory for list of its file paths"""
    f = []
    files = os.scandir(directory)
    for file in files:
        if file.is_file():
                f.append( os.path.join(directory, file) )
    return f

def getAllFiles(path):
    """scan input path for its directories and files within each directory, return all file paths"""
    fileList = []
    directories = getDirectories(path)
    for directory in directories:
        fileList.extend(getFiles(directory))
    return fileList

def fileRename(oldFilePath, newFolderPath, newFileName, fileIncrement):
    """Rename a file given its full path to one concatenated from a given folder path and filename.
        In case new file name already exists in destination, increment by fileIncrement.
        Returns True when success, False when FileExistsError raised
    """
    ext = ".pdf" #only used on pdf files
    try:
            os.rename(oldFilePath, newFolderPath + "/" + newFileName + ext)
            return True
    except FileExistsError:
            os.rename(oldFilePath, newFolderPath + "/" + newFileName + str(fileIncrement) + ext)
            return False


    






