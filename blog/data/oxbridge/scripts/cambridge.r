library(stringr);
library(pdftools);

#INPUT the input filepath and output filepath here, R's readline() is problematic and error-prone, so safer to input them here instead of asking user
filepath <- "/Users/houghtonstreet/Dropbox/Lime Street/limestreetlab.github.io/blog/data/oxbridge/raw/cambridge_2024.pdf";
out <- "/Users/houghtonstreet/Dropbox/Lime Street/limestreetlab.github.io/blog/data/oxbridge/extracted/cambridge_2024.csv"; 
isFrom2024 <- TRUE; #boolean flag to signal before/after 2024; cambridge reported application and offer less than 3 as "<3" until 2024, starting 2024 the numbers changed to less than and equal to 5 as "5"; thus the codes should change 5 to "<=5" if after 2024

str <- pdf_text(filepath); #pdf function to read the whole pdf file contents into a string

ucas_regex <- "[0-9]{5}"; #exactly 5 digits for school's UCAS ID
line_regex <- paste(ucas_regex, ".+?\\n", sep=""); #regex to identify each line starting from UCAS ID to newspace 
postcode_regex <- "[A-Z]{1,2}[0-9]{1,2}[A-Z]{0,1}\\s[0-9]{1}[A-Z]{1,2}"; #UK post code formats
name_regex <- paste(ucas_regex, "\\s{2,}", "(.+?)", "\\s{2,}", postcode_regex, sep=""); #anything between UCAS ID and postcode
other_regex <- paste(postcode_regex, "\\s+" , "(.+?)", "\\s{2,}" , "(.+?)",  "\\s{2,}", "(.+?)" , "\\s", sep=""); #whatever coming after postcode

lines <- str_extract_all(str, line_regex); #extracting lines from the read string
lines <- unlist(lines); #into a vector

#list variables for storing relevant info
ucasNumbers <- list();
names <- list();
postcodes <- list();
statuses <- list();
applications <- list();
offers <- list();

#reading line by line
for (i in 1:length(lines)) {

    line <- lines[i] #current line
    if ( !grepl("Other and Overseas", line) ) { #not containing the Overseas token in this line
        ucasNumber <- str_extract(line, ucas_regex);  #grab ucas from line
        ucasNumbers <- append(ucasNumbers, ucasNumber);
        postcode <- str_extract(line, postcode_regex); #grab postcode from line, any UK school must have a postcode
        postcodes <- append(postcodes, postcode);
        name <- str_match(line, name_regex)[,2]; #from name
        names <- append(names, name);
        other <- str_match(line, other_regex); 
        status <- other[,2];
        application <- other[,3];
        offer <- other[,4];
        if (isFrom2024) { #if cambridge data after 2024, check if application and offer equal to "5", which actually mean "<=5"
            #check if application = 5, if so both applications and offers <=5
            if( !is.na(application) & strtoi(application) == 5) {
              application <- "<=5"; #change to less than or equal to 5
              offer <- "<=5";
            } else if (!is.na(offer) & strtoi(offer) == 5) { #application not 5, but offer can still be = 5
              offer <- "<=5";
            }
        }
        statuses <- append(statuses, status);
        applications <- append(applications, application);
        offers <- append(offers, offer);
    }

}
ucas <- unlist(ucasNumbers); #unlist into vector
name <- unlist(names);
postcode <- unlist(postcodes);
status <- unlist(statuses);
application <- unlist(applications);
offer <- unlist(offers);

df <- data.frame(ucas, name, postcode, status, application, offer); #into data frame

write.csv(df, out, row.names=FALSE);
