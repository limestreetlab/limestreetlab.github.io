library(stringr);
library(pdftools);

#INPUT the input filepath and output filepath here, R's readline is problematic, so better hand input them here instead of asking user
filepath <- "/Users/houghtonstreet/Dropbox/Lime Street/limestreetlab.github.io/blog/data/oxbridge/raw/oxford_2023.pdf";
out <- "/Users/houghtonstreet/Dropbox/Lime Street/limestreetlab.github.io/blog/data/oxbridge/extracted/oxford_2023.csv"; 

str <- pdf_text(filepath);

line_regex <- "[0-9]{5}\\s{2,}.+?\\n";
regex <- "([0-9]{5})\\s{2,}(\\D+)((?<!-)\\d*)(\\s+\\d*)";

lines <- str_extract_all(str, line_regex);
lines <- unlist(lines);

ucasNumbers <- list();
names <- list();
applications <- list();
offers <- list();

for (i in 1:length(lines)) {

    line <- lines[i]
    matches <- str_match(line, regex);
    ucasNumber <- matches[,2];
    name <- trimws( matches[,3] );
    application <- trimws( matches[,4] );
    offer <- trimws( matches[,5] );
    
    #chunk to check if extracted applications number is indeed above offer number, sometimes when only application number exists (offer <3 = ""), it can show erroneously as offer number instead
    if ( application == "" & offer != "" & as.integer(offer) > 0 ) { #application is 0 but offer above 0, makes no sense, swap places
      application <- offer;
      offer <- "";
    }
    
    if (application == "") {
      application <- "<3";
    }
    if (offer == "") {
      offer <- "<3";
    }
    
    ucasNumbers <- append(ucasNumbers, ucasNumber);
    names <- append(names, name);
    applications <- append(applications, application);
    offers <- append(offers, offer);

}

ucas <- unlist(ucasNumbers);
name <- unlist(names);
application <- unlist(applications);
offer <- unlist(offers);

df <- data.frame(ucas, name, application, offer);

write.csv(df, out, row.names=FALSE);