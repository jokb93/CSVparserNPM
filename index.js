/*
Auther: Joachim Bertelsen
Email: Bertleren@gmail.com
date: 20-06-2018
*/
'use stricct';

/* Imports */
fs = require('fs');

/* Exports */
exports.csvParse = class csvParse {

    /* 
    Inputs:
    file = the path to the csv
    seperator = value for seperating entries in the csv.
    pairDelimiter = value to seperate pairs(rows) in the csv

    Default format: ',' and 'new line'
    */
    constructor(file, seperator = ",", pairDelimiter = "newline"){
        let data = fs.readFileSync(file, 'utf8');
        let sep = seperator;
        let pair = pairDelimiter;

        this.parsedCSV = [];

        //swap if newline
        if (pair == "newline") {
            pair = "\r\n";
        }

        //split by delimiter
        let groups = data.split(pair);
        let categories = groups[0].split(sep);

        //process each row
        for (let x = 1; x < groups.length; x++) {

            //Filter empty rows.
            if (groups[x] != "") {

                //split row and put into object lsit
                let row = groups[x].split(sep);
                let obj = {}
                for (let y = 0; y < groups[x].length; y++) {
                    // sidestep empty's
                    if (row[y] != undefined) {
                        obj[categories[y]] = row[y];
                    }
                }
                this.parsedCSV.push(obj);

            }

        }
    }
}